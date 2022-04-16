const { GraphQLUpload } = require('graphql-upload');
const { finished } = require('stream/promises');

const { AuthenticationError } = require('apollo-server-express');
const { User, Item } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    //Query users similar to user height and weight, by user id
    userMatches: async (parent, args, {}) => {
      // adjust these numbers higher to broaden the scope of the serach
      let heightVar = 0.03;
      let weightVar = 0.05;
      const userMatches = await User.find({
        $and: [
          {
            height: {
              $gte: args.height - args.height * heightVar,
              $lt: args.height + args.height * heightVar,
            },
          },
          {
            weight: {
              $gte: args.weight - args.weight * weightVar,
              $lt: args.weight + args.weight * weightVar,
            },
          },
        ],
      })
        .populate('closet')
        .populate({
          path: 'closet',
          populate: [
            '_id',
            'category',
            'style',
            'brand',
            'name',
            'gender',
            'size',
            'link',
            'photo',
            'color',
            'review',
          ],
        });
      console.log(userMatches.length);
      // if no matches, return the closets of 15 random users.
      if (userMatches.length !== 0) {
        return userMatches;
      } else {
        const randomUsers = User.find({}).limit(15).populate('closet');
        return randomUsers;
      }
    },

    // GET any user
    user: async (parent, { username }, context) => {
      if (context.user) {
        return await User.findOne({ username })
          .populate('closet')
          .populate({
            path: 'closet',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          })
          .populate('savedItems')
          .populate({
            path: 'savedItems',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET logged in user
    me: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findOne({ _id })
          .populate('closet')
          .populate({
            path: 'closet',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          })
          .populate('savedItems')
          .populate({
            path: 'savedItems',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // GET one item, by item id.
    item: async (parent, args) => {
      return await Item.findOne(args.id).populate([
        '_id',
        'category',
        'style',
        'brand',
        'name',
        'gender',
        'size',
        'link',
        'photo',
        'color',
        'review',
      ]);
    },

    // GET all items
    // eslint-disable-next-line no-unused-vars
    items: async (parent, args) => {
      return await Item.find({}).populate([
        '_id',
        'category',
        'style',
        'brand',
        'name',
        'gender',
        'size',
        'link',
        'photo',
        'color',
        'review',
      ]);
    },

    // GET user closet (ITEMS), based on user id entered in args
    closet: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id })
          .populate('closet')
          .populate({
            path: 'closet',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET users savedItems (FAVORITES), pull from user id entered in args
    savedItems: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id })
          .populate('savedItems')
          .populate({
            path: 'savedItems',
            populate: [
              '_id',
              'category',
              'style',
              'brand',
              'name',
              'gender',
              'size',
              'link',
              'photo',
              'color',
              'review',
            ],
          });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // GET all users this user id is following
    following: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id }).populate('following');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // GET all followers of the user _id entered in args.
    followers: async (parent, { _id }, context) => {
      if (context.user) {
        return await User.findById({ _id }).populate('followers');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // # This is only here to satisfy the requirement that at least one
    // # field be present within the 'Query' type.  This example does not
    // # demonstrate how to fetch uploads back.
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
        throw new AuthenticationError('Incorrect enmail or password entered');
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
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream('local-file-output.txt');
      stream.pipe(out);
      await finished(out);

      return { filename, mimetype, encoding };
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
