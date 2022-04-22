const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    //Query users similar to user height and weight, by user id
    userMatches: async (parent, args, context) => {
      // const user = await User.findById(context.user._id);
      // adjust these numbers higher to broaden the scope of the serach
      let heightVar = 0.03;
      let weightVar = 0.05;
      const userMatches = await User.find({
        $and: [
          {
            height: {
              $gte: context.user.height - context.user.height * heightVar,
              $lt: context.user.height + context.user.height * heightVar,
            },
          },
          {
            weight: {
              $gte: context.user.weight - context.user.weight * weightVar,
              $lt: context.user.weight + context.user.weight * weightVar,
            },
          },
        ],
      })
        .populate('closet')
        .populate({
          path: 'closet',
          populate: 'user',
        });
      // if no matches, return the closets of 15 random users.
      if (userMatches.length !== 0) {
        return userMatches;
      } else if (!args || userMatches.length === 0) {
        const randomUsers = User.find({}).limit(15).populate('closet');
        return randomUsers;
      } else {
        console.log('Did not work');
      }
    },

    // GET any user
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username })
          .populate('closet')
          .populate({
            path: 'closet',
            populate: 'user',
          })
          .populate('savedItems')
          .populate({
            path: 'savedItems',
            populate: 'user',
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    me: async (parent, args, context) => {
      // if (context.user) {
      const userData = await User.findOne({ _id: context.user._id })
        .populate('closet')
        .populate({
          path: 'closet',
          populate: 'user',
        })
        .populate('savedItems')
        .populate({
          path: 'savedItems',
          populate: 'user',
        });
      return userData;
      // }
      // throw new AuthenticationError('You need to be logged in!');
    },

    // GET one item, by item id.
    item: async (parent, args) => {
      return await Item.findOne(args.id).populate('user');
    },

    // GET all items
    // eslint-disable-next-line no-unused-vars
    items: async (parent, args) => {
      return await Item.find({}).populate('user');
    },

    // GET items that match the keyword and the user's stats
    searchItems: async (parent, { keyword }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to search');
      }

      // show matches for 3% higher and lower
      const multiplier = 0.03;
      const { height, weight, _id: user_id } = context.user;

      const searchFilter = {
        // match the similar height and weight
        $and: [
          {
            height: {
              $gte: height - height * multiplier,
              $lt: height + height * multiplier,
            },
          },
          {
            weight: {
              $gte: weight - weight * multiplier,
              $lt: weight + weight * multiplier,
            },
          },
          // not equal to the searching user's id
          {
            user_id: {
              $ne: user_id,
            },
          },
        ],
        // $regex will scale poorly, but it works!
        $or: [
          { category: { $regex: keyword, $options: 'i' } },
          { style: { $regex: keyword, $options: 'i' } },
          { brand: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
          { size: { $regex: keyword, $options: 'i' } },
          { color: { $regex: keyword, $options: 'i' } },
          { review: { $regex: keyword, $options: 'i' } },
        ],
      };

      return await Item.find(searchFilter).populate('user');
    },

    // GET user closet (ITEMS), based on user id entered in args
    closet: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id }).populate('closet').populate({
          path: 'closet',
          populate: 'user',
        });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET users savedItems (FAVORITES), pull from user id entered in args
    savedItems: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById({ _id })
          .populate('savedItems')
          .populate({
            path: 'savedItems',
            populate: 'user',
          });

        return user.savedItems;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET all closet items of all users this user id is following
    following: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById({ _id: context.user._id })
          .populate('following')
          .populate({
            path: 'closet',
            select: '_id',
          });
        return user;
      }

      throw new AuthenticationError('Benjamin Dreewes!');
    },

    // GET all followers of the user _id entered in args.
    followers: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id }).populate('followers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  // starting mutations file
  Mutation: {
    // POST-CREATE new user
    addUser: async (parent, args) => {
      const duplicateUsername = await User.findOne({ username: args.username });

      if (duplicateUsername) {
        throw new Error('This username is already taken');
      }

      const duplicateEmail = await User.findOne({ email: args.email });
      if (duplicateEmail) {
        throw new Error('This email is already taken');
      }

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
        throw new AuthenticationError('Hmm that does not match our records');
      }

      const token = signToken(user);
      return { token, user };
    },
    // POST items to users' closet
    addItem: async (parent, args, context) => {
      if (context.user) {
        const { height, weight, _id } = context.user;
        const item = await new Item({
          // item args
          ...args,

          // user context stats
          height,
          weight,
          user_id: _id,
        });
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
    // POST photo to an item. Also UPDATES any existing photo in the database for this item.
    addPhoto: async (parent, args, context) => {
      if (context.user) {
        return await Item.findByIdAndUpdate(
          { _id: args._id },
          { $set: { photo: args.photo } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // POST photo to a USER. Also UPDATES any existing photo in the database for this user.
    addProfilePhoto: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $set: { primaryPhoto: args.primaryPhoto } },
          { new: true }
        );
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

    // POST add this username to users 'follower' array (i.e. I follow Kelsey. Kelseys user id passes through args then it finds Kelsey's User account and adds me as a follower.)

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

    // POST add this username to logged in users' 'following' array. (i.e. I follow Kelsey. Kelsey's user id passes through args. It finds my user account and adds Kelsey to who I'm following.)
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

    // DELETE photo the user has added to its profile
    removeProfilePhoto: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          { _id: _id },
          { $set: { primaryPhoto: '' } },
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
