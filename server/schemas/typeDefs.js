const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query: {}

    type Mutation: {}
`;

module.exports = typeDefs;
