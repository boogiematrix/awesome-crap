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
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({ username, email, password });
            
            const token = signToken(user)

            return {token, user}
        },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new AuthenticationError("Can't find this user")
            };
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Wrong password!');
            }
            const token = signToken(user);

            return { token, user }
        },
        addSale: async (parent, args, context) => {
            if (context.user) {
                const sale = await Sale.create(args);
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { sales: sale } },
                    { new: true, runValidators: true })
                return sale 
            } else {
                throw new AuthenticationError("You're not logged in!")
            }
            
        },
        updateSale: async (parent, args, context) => {
            if (context.user) {
                const updatedSale = await Sale.findByIdAndUpdate(args._id, args)
                if (!updatedSale) {
                    throw new AuthenticationError("No such yard sale")
                }
                return updatedSale
            }
            throw new AuthenticationError("You need to be logged in to update a sale!")
        },
        removeSale: async (parent, args, context) => {
            if (context.user) {
                const removedSale = await Sale.findByIdAndDelete(args._id)
                if (!removedSale) {
                    throw new AuthenticationError("Could not delete sale")
                }
                return removedSale
            }
            throw new AuthenticationError("You must be logged in to delete a sale")
        },
        saveSale: async (parent, args, context) => {
            console.log(`saved: ${args}`)
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedSales: args } },
                    { new: true, runValidators: true }
                )
                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to save a sale")
        },
        unsaveSale: async (parent, args, context) => {
            console.log(`unsaved: ${args}`)
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedSales: { _id: args._id } } },
                    {new: true}
                )
                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to unsave a sale")
        }
    }
}

module.exports = resolvers