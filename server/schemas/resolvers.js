const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // working
    // TEST SAVED ITEMS
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username });
        // .populate(
        //   // 'following',
        //   // 'followers',
        //   'savedItems'
        //   // 'closet'
        // );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // working
    me: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findOne({ _id })
          .populate
          // 'following',
          // 'followers',
          // 'savedItems',
          // 'closet'
          ();
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // item is working! Display one item, by item id.
    item: async (parent, args) => {
      return await Item.findOne(args.id);
    },

    // items is working! find all items (perhaps for random image generation/home page)
    // eslint-disable-next-line no-unused-vars
    items: async (parent, args) => {
      return await Item.find();
    },

    // Retrieve user closet (ITEMS), pull from user Id
    //WORK IN PROGRESS
    /*closet: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id }).populate('closet');
      }
      throw new AuthenticationError('You need to be logged in!');
    },*/
  },
  // starting mutations file
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
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

    // still working on this -
    addItem: async (parent, args, context) => {
      console.log('parent', parent);
      console.log('args', args);
      if (args) {
        const item = await Item.create(args);
        console.log('item', item);
        const userToUpdate = await User.findByIdAndUpdate(
          { _id: args._id },
          // { $addToSet: { savedBooks: args.input } },
          { new: true }
        );
        console.log('userToUpdate', userToUpdate);
      }
      // console.group('context', context);
      /*if (context.user) {
        const item = await Item.create(args);

        // await User.findByIdAndUpdate(context.user._id, {
        //   // not sure what this statement should be
        //   $push: { items: item },
        // });

        return item;
      }

      throw new AuthenticationError('You need to be logged in!');
      */
    },
  },
};

module.exports = resolvers;
