
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const rolesDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  
  input createRole {
    role: String!
  }

  input deleteRole {
    roleId: Int!
  }

  type showMessage{
    message:String
  }

  type Query {
    getAllRoles: JSON!
  }

  type Mutation {
    createRole(input: createRole!): showMessage!
    deleteRole(input: deleteRole!): showMessage!
  }

`;

module.exports = rolesDefs