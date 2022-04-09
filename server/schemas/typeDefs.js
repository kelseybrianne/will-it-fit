const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: _id!
        username: String!
        email: String!
        password: String!
        height: Int
        heightUnits:[Unit]
        weight: Int
        weightUnits:String
        closet:[Closet]
        primaryPhoto:String
        following:[User]
        followers:[User]
        savedItems:[Item]
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
        item: [Item]
        photo: [Photo]
    }

    type Item {
        _id: _id!
        category: String!
        style: String
        brand: String
        name: String!
        gender: String
        size: String!
        link: String
        photo: String
        color: String
        comments:[Comment]
    }

    type Comment {
        commentText: String!
        commentAuthor: User!
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }


    type Query: {
        users: [User]

    }

    type Mutation: {}
`;

module.exports = typeDefs;
