const { rule, shield, and, or, not, inputRule, allow, deny } = require("graphql-shield");
const { PrismaClient } = require('../src/generated/client')
const { GraphQLError } = require('graphql');
const { errorName } = require('../utils/constants');

const prisma = new PrismaClient({
  errorFormat: 'pretty'
})

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, context, info) => {
  if (context.id == undefined) return new GraphQLError(errorName.UNAUTHORIZED);
  return true;
});

const isAdmin = rule({ cache: 'contextual' })(async (parent, args, context, info) => {
  const role = await prisma.roles.findUnique({
    where: {
      role: 'admin'
    }
  })

  if (context.roleId != role.id) return new GraphQLError(errorName.UNAUTHORIZED);
  return true

});

const isStreamer = rule({ cache: 'contextual' })(async (parent, args, context, info) => {
  const role = await prisma.roles.findUnique({
    where: {
      role: 'streamer'
    }
  })

  if (context.roleId != role.id) return new GraphQLError(errorName.UNAUTHORIZED);
  return true

});

const isViewer = rule({ cache: 'contextual' })(async (parent, args, context, info) => {

  const role = await prisma.roles.findUnique({
    where: {
      role: 'viewer'
    }
  })

  if (context.roleId != role.id) return new GraphQLError(errorName.UNAUTHORIZED);
  return true

});


const permissions = shield({
  Query: {
    getUser: isAuthenticated,
    getAllUsers: isAuthenticated,
    getAllRoles: isAuthenticated,
  },
  Mutation: {
    register: not(isAuthenticated),
    forgetPassword: not(isAuthenticated),
    verifyCode: not(isAuthenticated),
    resetPassword: not(isAuthenticated),
    login: not(isAuthenticated),
    verifyAuthToken: not(isAuthenticated),
    updateUser: and(isAuthenticated, or(isViewer, isStreamer)),
    createRole: and(isAuthenticated, isAdmin),
    deleteRole: and(isAuthenticated, isAdmin),
  }
}, {
  fallbackRule: allow
});

module.exports = { permissions };
