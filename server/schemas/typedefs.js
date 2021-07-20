const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Sale {
        _id: ID
        location: String
        startDate: String
        endDate: String
        startTime: String
        endTime: String
        description: String
        image: String
    }
    
    type User {
        _id: ID
        username: String
        email: String
        password: String
        sales: [Sale]
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
            startTime: String!,
            endTime: String!,
            description: String!,
            image: String,
        ): Sale
        updateSale(
            _id: ID!,
            location: String,
            startDate: String,
            endDate: String,
            startTime: String,
            endTime: String,
            description: String,
            image: String,
            ): Sale
        removeSale(_id: ID!): Sale
    }
`

module.exports = typeDefs