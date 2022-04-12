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

  type Photo {
    path: String!
    name: String!
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
    me: User

    item(name: String!): Item
    items: [Item]

    closet(closetId: ID!): User

    photo(name: String!): User
    photos: [Photo]

    # comments(username: String): [Comment]
    # comment(commentId: ID!): Comment

    following(username: String!): [User]
    followers(username: String!): [User]
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
      photo: String
      color: String
    ): User
    removeItem(itemId: ID!): User

    # addComment(username: String!): User
    # removeComment(commentId: ID!): User

    addPhoto(path: String!, name: String!): User
    removePhoto: User

    addFollower(username: String!): User
    removeFollower(username: String!): User
  }
`;

module.exports = typeDefs;
