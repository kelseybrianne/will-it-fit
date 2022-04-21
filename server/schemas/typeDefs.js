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
    primaryPhoto: String!
    shoeSize: String
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
    primaryPhoto: String!
    shoeSize: String
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
    createdAt: Float
    height: Int
    weight: Int
    user_id: ID
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type Query {
    user(username: String!): User
    users: [User]
    me: User

    userMatches: [User]

    item(_id: ID!): Item
    items: [Item]

    closet(_id: ID!): User
    savedItems(_id: ID!): User

    following(_id: ID!): [User]
    followers(_id: ID!): User

    searchItems(keyword: String): [Item]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
    addUser(
      username: String!
      email: String!
      password: String!
      height: Float!
      # heightUnits: String
      weight: Float!
      # weightUnits: String
      primaryPhoto: String
      shoeSize: String
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
    removeItem(_id: ID!): User

    addFavorite(_id: ID!): User
    removeFavorite(_id: ID!): User

    addPhoto(_id: ID!, photo: String!): Item

    addProfilePhoto(_id: ID!, primaryPhoto: String!): User
    removeProfilePhoto(_id: ID!): User

    addFollowing(_id: ID!): User
    removeFollowing(_id: ID!): User

    addFollower(_id: ID!): User
    removeFollower(_id: ID!): User
  }
`;

module.exports = typeDefs;
