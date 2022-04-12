const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    height: Int
    heightUnits: [Unit]
    weight: Int
    weightUnits: String
    closet: [Closet]
    primaryPhoto: String
    following: [User]
    followers: [User]
    savedItems: [Item]
  }

  type Unit {
    inches: Int
    feet: Int
  }

  type Photo {
    path: String!
    name: String!
  }

  type Closet {
    #   Do we need these '_id's' called out specifically? Can delete if not.
    _id: ID!
    item: [Item]
    photo: [Photo]
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
    photo: String
    color: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String!
    commentAuthor: User!
    createdAt: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    users: [User]

    item(name: String!): Item
    items: [Item]

    closet(closetId: ID!): User

    photo(name: String!): User
    photos: [Photo]

    comments(username: String): [Comment]
    comment(commentId: ID!): Comment

    following(username: String!): [User]
    followers(username: String!): [User]
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      height: Int
      heightUnits: String
      weight: Int
      weightUnits: String
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

    addComment(username: String!): User
    removeComment(commentId: ID!): User

    addPhoto(path: String!, name: String!): Photo
    removePhoto: Photo

    addFollower(username: String!): User
    removeFollower(username: String!): User
  }
`;

module.exports = typeDefs;
