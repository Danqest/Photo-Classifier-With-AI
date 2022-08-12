const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    collections: [Collection]
  }

  type Collection {
    _id: ID
    collectionTitle: String
    collectionOwner: String
    subfolders: [Subfolder]
  }

  type Subfolder {
    _id: ID
    subfolderName: String
    parentCollection: String
  }

  type Query {
    users: [User]
    collections: [Collection]
    subfolders: [Subfolder]
  }
`;

module.exports = typeDefs;
