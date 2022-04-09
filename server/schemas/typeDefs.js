const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id: ID!
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
        comments:[Comment]
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

    type Query: {
        users: [User]
        user(
            username: String!)
            ; User
        item:(
            name: String!
            ); Item
        items: [Item]
        photo:(
            name: String!
            ); Photo
        photos: [photos]

        comments(
            username: String
            ): [Comment]
        comment(commentId: ID!):

        following(
            username: String!
        )
        followers(
            username: String!
        ); User
    }

    type Mutation: {
        addUser(
            username: String! 
            email: String! 
            password: String!
            height: Int
            heightUnits:[Unit]
            weight: Int
            weightUnits:String
            closet:[Closet]
            primaryPhoto:String
            ): Auth
        login(
            email: String!, 
            password: String!
            ): Auth

        addItem(
            category:String!, 
            style: String,
             brand: String, 
             name: String!, 
             gender: String, 
             size: String!, 
             link: String, 
             photo: String, 
             color: String
             ): Item
        removeItem: Item

        addComment(
            commentText: String!
            commentAuthor: User! 
            ): Comment
        removeComment: Comment

        addPhoto(
            path: String! 
            name: String!
            ): Photo
        removePhoto: Photo

        addFollower(
            username: String!
        ): User
        removeFollower(
            username: String!
        ): User


    }
`;

module.exports = typeDefs;
