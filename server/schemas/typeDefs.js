const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    collections: [Collection]
  }

  type Auth {
    token: ID!
    user: User
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
    user(username: String!): User
    collections: [Collection]
    userCollections(collectionOwner: String!): [Collection]
    subfolders: [Subfolder]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCollection(collectionTitle: String!): Collection
    addSubfolder(subfolderName: String!): Subfolder
  }
`;

module.exports = typeDefs;
