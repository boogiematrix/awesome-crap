const { AuthenticationError } = require('apollo-server-express');
const { User, Sale } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        sales: async () => {
            return await Sale.find()
        },
        sale: async (parent, {_id}) => {
            return await Sale.findById(_id)
        }
    },
    Mutation: {
        addUser: async (parent, args) => {

        },
        login: async () => {

        },
        addSale: async (parent, args) => {

        },
        updateSale: async (parent, args) => {

        },
        removeSale: async (parent, args) => {

        }
    }
}