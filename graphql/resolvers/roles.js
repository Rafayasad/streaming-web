const { PrismaClient, Prisma } = require('../../src/generated/client')
const { errorName, successName } = require('../../utils/constants');
const { errorGenerator } = require('../../helper/helper')

const prisma = new PrismaClient({
    errorFormat: 'pretty'
})

const rolesResolver = {

    Query: {

        getAllRoles: async (parent, args, { id }) => {
            try {
                const roles = await prisma.roles.findMany()
                return roles

            } catch (err) {
                return errorGenerator(errorName.INTERNALSERVER)
            }
        }

    },
    Mutation: {

        createRole: async (parent, { input }, { id }) => {
            try {
                const { role } = input
                await prisma.roles.create({
                    data: {
                        role
                    }
                })

                return {
                    message: successName.ROLECREATED
                }

            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2002') return errorGenerator(errorName.ROLEALREADYEXIST)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }
                return errorGenerator(errorName.INTERNALSERVER)
            }
        },

        deleteRole: async (parent, { input }, { id }) => {
            try {
                const { roleId } = input
                await prisma.roles.delete({
                    where: {
                        id: roleId
                    }
                })

                return {
                    message: successName.ROLEDELETED
                }

            } catch (err) {
                if (err instanceof Prisma.PrismaClientKnownRequestError) {
                    if (err.code === 'P2025') return errorGenerator(errorName.NORECORDFOUND)
                    else return errorGenerator(errorName.INTERNALSERVER)
                }

                return errorGenerator(errorName.INTERNALSERVER)
            }
        }

    }

};


module.exports = rolesResolver;