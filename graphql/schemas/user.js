
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const userDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  scalar Date
  scalar JSON
  scalar Upload

  type showMessage{
    message:String
  }

  type dataWithMessage{
    data: JSON!
    message:String!
  }

  type userData{
    id:Int!
    email:String!
    fullname:String
    phoneNumber:String
    dob:Date
    gender:String
    aboutMe:String
    interests:JSON
    profilePic:String
  }

  enum authType{
    facebook
    google
    apple
  }

  
  input login{
    password: String! @constraint(minLength: 8, maxLength: 20)
    email: String!,
  }

  input register{
    password: String! @constraint(minLength: 8, maxLength: 20)
    email: String!,
    roleId: Int!
  }
  
  input forget{
    email: String!
  }

  input allUsers{
    roleId: Int
  }

  input verify{
    otp: Int!
    email: String!
  }

  input verify{
    otp: Int!
    email: String!
  }

  input authToken{
    type: authType!
    accessToken: String!
    roleId : Int!
  }

  input update{
    fullname:String
    phoneNumber:String
    dob:Date
    gender:String
    aboutMe:String  
    interests:JSON
  }

  type Query {
    getUser: userData!
    getAllUsers(input: allUsers): userData!
  }
  
  type Mutation {
    register(input: register!): dataWithMessage!
    forgetPassword(input: forget!): dataWithMessage!
    verifyCode(input: verify!): dataWithMessage!
    resetPassword(input: login!): dataWithMessage!
    verifyAuthToken(input: authToken!): dataWithMessage!
    login(input: login!): dataWithMessage!
    updateUser(profilePic: Upload,input: update!): dataWithMessage!
  }

`;

module.exports = userDefs