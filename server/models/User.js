const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
// eslint-disable-next-line no-unused-vars
const itemSchema = require('./Item');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },

    password: {
      type: String,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    // heightUnits: {
    //   type: String,
    //   required: true,
    //   //   in or cm <-- could use some front end magic
    // },

    weight: {
      type: Number,
      required: true,
    },

    // weightUnits: {
    //   type: String,

    //   // lbs or kgs <-- could use some front end magic
    // },

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
    // do we need this ?
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
