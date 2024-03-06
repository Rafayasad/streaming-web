const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const { errorName } = require('../utils/constants');
const { PrismaClient } = require('../src/generated/client')
const { facebookVerifyToken, getFacebookUserEmail } = require('../helper/helper')
const axios = require('axios');

const prisma = new PrismaClient({
  errorFormat: 'pretty'
})

module.exports = {
  verifyToken: async (token) => {
    try {
      if (!token) return undefined;
      let authUser = jwt.verify(token, process.env.APP_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: authUser.id,
        },
      })
      return user;
    }
    catch (error) {
      return new GraphQLError(errorName.UNAUTHORIZED)
    }
  },

  facebookTokenVerify: async (token) => {
    try {
      const debugToken = await facebookVerifyToken(token, process.env.FACEBOOK_ACCESS_TOKEN);
      if (debugToken) {
        let response = await getFacebookUserEmail(token);
        return response['data'].email
      } else return errorGenerator(errorName.TOKENVERIFICATIONFAILED)
    }
    catch (error) {
      return new GraphQLError(errorName.UNAUTHORIZED)
    }
  },

  googleTokenVerify: async (token) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
      if (response.status === 200) {
        return response['data'].email

      } else return errorGenerator(errorName.TOKENVERIFICATIONFAILED)

    } catch (error) {
      return new GraphQLError(errorName.UNAUTHORIZED)
    }
  }
}
