const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const express = require('express');
const http = require('http');
const cors = require('cors');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/schemas');
const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');
const { DocumentNode, GraphQLError } = require('graphql');
const getErrorCode = require('./utils/error');
const { createApolloQueryValidationPlugin, constraintDirectiveTypeDefs } = require('graphql-constraint-directive');
// const { useServer } = require('graphql-ws/lib/use/ws');
const { applyMiddleware } = require("graphql-middleware");
const { expressMiddleware } = require('@apollo/server/express4');
const { permissions } = require("./context/permissions");
const { errorName } = require('./utils/constants');
const { makeExecutableSchema } = require("@graphql-tools/schema");
// const { WebSocketServer } = require('ws');
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl');
const { ApolloServerPluginLandingPageLocalDefault } = require('@apollo/server/plugin/landingPage/default');
const auth = require('./context/authorization');
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js')

async function startServer() {


    const app = express();
    let schema = makeExecutableSchema({ typeDefs: [constraintDirectiveTypeDefs, typeDefs], resolvers });
    const schemaWithPermissions = applyMiddleware(schema, permissions);
    const httpServer = http.createServer(app);
    // const wsServer = new WebSocketServer({
    //     server: httpServer,
    //     path: '/graphql',
    // });
    // const serverCleanup = useServer({
    //     schema,
    //     context: async (ctx, msg, args) => {
    //         const token = (ctx && ctx.connectionParams) || '';
    //         const user = await auth.verifyToken(token.Authorization);
    //         return { user }
    //     },
    //     onConnect: async (ctx) => {
    //         const token = (ctx && ctx.connectionParams) || '';
    //         const user = await auth.verifyToken(token.Authorization);
    //         if (user == undefined) {
    //             return new GraphQLError(errorName.UNAUTHORIZED)
    //         }
    //     },
    // }, wsServer)

    const server = new ApolloServer({
        uploads: { maxFileSize: 5000000000 || '50mb' },
        schema: schemaWithPermissions,
        plugins: [
            createApolloQueryValidationPlugin({ schema }),
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.drain();
                        },
                    };
                },
            },
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ApolloServerPluginCacheControl({
                defaultMaxAge: 5,
                calculateHttpHeaders: false,
            })
        ],
        status400ForVariableCoercionErrors: true,
        cache: 'bounded',
        cache: new InMemoryLRUCache({
            maxSize: Math.pow(2, 20) * 100,
            ttl: 300000,
        }),
        cors: {
            origin: "*"
        },
        introspection: true,
        csrfPrevention: false,
        documentStore: new InMemoryLRUCache < DocumentNode > ({
            maxSize: Math.pow(2, 20) * 10,
            sizeCalculation: InMemoryLRUCache.sizeCalculation,
        }),
        formatError: (formattedError) => {
            const error = getErrorCode(formattedError.message);
            const sendErr = error ? error : { message: formattedError.message, statusCode: 400 }
            return sendErr
        }
    });

    await server.start();

    app.use(graphqlUploadExpress({ maxFileSize: 5000000000 || '50mb', maxFiles: 10 }));
    app.use("/assets", express.static(__dirname + "/assets"));

    app.use(
        '/graphql',
        cors({ origin: "*" }),
        express.json(),
        expressMiddleware(server,
            {
                context: async ({ req }) => {
                    const token = req.headers.authorization || '';
                    const ctx = await auth.verifyToken(token);
                    if (!ctx && ctx != undefined) throw new GraphQLError(errorName.UNAUTHORIZED);
                    return ctx;
                }
            }
        ),
    );

    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}/graphql`);

    app.get('/health', (req, res) => {
        res.status(200).send('Okay!');
    });

}

startServer()