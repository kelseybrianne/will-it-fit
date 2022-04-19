const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const itemSchema = require('./Item');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },

    password: {
      type: String,
      required: [true, 'password is required'],
    },

    height: {
      type: Number,
      required: [true, 'height is required'],
    },

    weight: {
      type: Number,
      required: [true, 'weight is required'],
    },

    closet: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],

    primaryPhoto: {
      type: String,
    },

    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    savedItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;