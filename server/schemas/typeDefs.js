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

    closet(_id: ID!): [Item]
    savedItems(_id: ID!): [Item]

    followers(_id: ID!): User
    following: User
    # returns all data associated with items of all followers so we can pull user ID's OR item ID's from query.
    feed: [Item]

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
      user: ID!
      user_id: ID!
    ): Item
    removeItem(_id: ID!): User

    addFavorite(_id: ID!): User
    removeFavorite(_id: ID!): User

    editPhoto(_id: ID!, photo: String!): Item

    editProfile(height: Float!, weight: Float!): User
    editProfilePhoto(primaryPhoto: String!): User

    removeProfilePhoto(_id: ID!): User
    # these are the ones to use, remove others after testing.
    addFollowing(_id: ID!): User
    removeFollowing(_id: ID!): User

    addFollower(_id: ID!): User
    removeFollower(_id: ID!): User
  }
`;

module.exports = typeDefs;
