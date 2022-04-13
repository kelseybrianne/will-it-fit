const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    # password: String!
    height: Float!
    # heightUnits: [Unit]
    weight: Float!
    # weightUnits: String
    closet: [Item]
    primaryPhoto: String
    following: [User]
    followers: [User]
    savedItems: [Item]
  }

  type me {
    _id: ID!
    username: String!
    email: String!
    # password: String!
    height: Float!
    # heightUnits: [Unit]
    weight: Float!
    # weightUnits: String
    closet: [Item]
    primaryPhoto: String
    following: [User]
    followers: [User]
    savedItems: [Item]
  }

  type Item {
    _id: ID!
    category: String!
    style: String
    brand: String
    name: String!
    gender: String
    size: String!
    link: String
    photo: String!
    color: String
    review: String
  }

  #   type Comment {
  #     _id: ID!
  #     commentText: String!
  #     commentAuthor: User!
  #     createdAt: String!
  #   }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]
    me(_id: ID!): User

    item(_id: ID!): Item
    items: [Item]

    closet(_id: ID!): User
    savedItems(_id: ID!): User

    following(_id: ID!): User
    followers(_id: ID!): User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      height: Float!
      # heightUnits: String
      weight: Float!
      # weightUnits: String
      primaryPhoto: String
    ): Auth

    login(email: String!, password: String!): Auth

    addItem(
      category: String!
      style: String
      brand: String
      name: String!
      gender: String
      size: String!
      link: String
      photo: String!
      color: String
      review: String
    ): Item

    addFavorite(_id: ID!): User
    removeFavorite(_id: ID!): User

    removeItem(_id: ID!): User

    removePhoto(_id: ID!): Item

    addFollowing(_id: ID!): User
    removeFollowing(_id: ID!): User

    addFollower(_id: ID!): User
    removeFollower(_id: ID!): User
  }
`;

module.exports = typeDefs;
