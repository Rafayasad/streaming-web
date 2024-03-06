var jwt = require("jsonwebtoken");
const { GraphQLError } = require('graphql');
const { errorName } = require('../utils/constants');

const generateToken = async (payload) => {
  try {
    var token = await jwt.sign(payload, process.env.APP_SECRET, { expiresIn: '360d' });;
    return token;
  }
  catch (error) {
    return new GraphQLError(errorName.UNAUTHORIZED)
  }
};
module.exports = {
  generateToken
};
