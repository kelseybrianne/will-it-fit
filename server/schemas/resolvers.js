const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // GET any user
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET logged in user
    me: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findOne({ _id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // GET one item, by item id.
    item: async (parent, args) => {
      return await Item.findOne(args.id);
    },

    // GET all items
    // eslint-disable-next-line no-unused-vars
    items: async (parent, args) => {
      return await Item.find();
    },

    // GET user closet (ITEMS), based on id entered in args
    closet: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.find({ _id }).populate('closet');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET users savedItems (FAVORITES), pull from user id entered in args
    savedItems: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.find({ _id }).populate('savedItems');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET all users the user _id is following
    following: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.find({ _id }).populate('following');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // GET all followers of the user _id entered in args.
    followers: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.find({ _id }).populate('followers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // starting mutations file
  Mutation: {
    // POST-CREATE new user
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // POST login
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
    // POST items to users' closet
    addItem: async (parent, args, context) => {
      if (context.user) {
        const item = await new Item(args);
        item.save();
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { closet: item } },
          { new: true }
        );
        return item;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // POST - favorite items from other users closet into savedItems
    addFavorite: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedItems: _id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // POST add this username to users 'follower' array (i.e. I follow Kelsey. Kelseys username passes through args then it finds Kelsey's User account and adds me as a follower.)

    addFollower: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: _id },
          { $push: { followers: context.user._id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // POST add this username to logged in users' 'following' array. (i.e. I follow Kelsey. My username passes through args. It finds my user account and adds Kelsey to who I'm following.)
    addFollowing: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { following: _id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // DELETE items from users' closet
    removeItem: async (parent, { _id }, context) => {
      if (context.user) {
        await Item.findByIdAndDelete(_id);
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { closet: _id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You might not be logged in.');
    },

    // DELETE items the user has previously saved as savedItems/favorites
    removeFavorite: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedItems: _id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // DELETE photo the user has previously added to an item.
    removePhoto: async (parent, args, context) => {
      if (context.user) {

        return await Item.findByIdAndUpdate(
          { _id: _id },
          { $pull: args.photo },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // DELETE this 'username' from logged in users 'followers' array. (i.e. I stop following Kelsey. My username is passed through args. It finds Kelsey's user account by her username and removes MY name from her list of followers.
    removeFollower: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { followers: _id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // DELETE this 'username' from logged in users 'following' array. (i.e. I stop following Kelsey. Kelsey's username is passed through args. It finds my user account and removes Kelsey's name from the list of who I'm following. )
    removeFollowing: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: _id },
          { $pull: { following: context.user._id } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
