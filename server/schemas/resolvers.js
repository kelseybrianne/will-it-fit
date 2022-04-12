const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate(
          'following',
          'followers',
          'savedItems',
          'closet'
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    closet: async (parent, args) => {
      return await Closet.findById(args.id).populate('item', 'photo');
    },
    item: async (parent, args) => {
      // Populate the comment subdocument
      return await Item.find(args.id).populate('comments');
    },
  },

  // starting mutations file
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Hmm that does not match our records');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
