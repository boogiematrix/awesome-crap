const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Sale {
        _id: ID
        location: String
        startDate: String
        endDate: String
        description: String
        image: String
        creator: ID
    }
    
    type User {
        _id: ID
        username: String
        email: String
        password: String
        sales: [Sale]
        savedSales: [ID]
    }

    type Auth {
        token: ID
        user: User
    }

    type Query{
        me: User
        sales: [Sale]
        sale(_id: ID!): Sale 
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addSale(
            location: String!,
            startDate: String!,
            endDate: String!,
            description: String!,
            image: String,
            creator: ID!
        ): Sale
        updateSale(
            _id: ID!,
            location: String,
            startDate: String,
            endDate: String,
            description: String,
            image: String,
            ): Sale
        removeSale(_id: ID!): Sale
        saveSale(
            _id: ID!,
            location: String!,
            startDate: String!,
            endDate: String!,
            description: String!,
            image: String
            ): User
        unsaveSale(
            _id: ID!
        ): User
    }
`

module.exports = typeDefs