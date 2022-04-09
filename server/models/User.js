const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const itemSchema = require("./Item");

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
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    height: {
      type: INT,
    },
    //   in or cm
    heightUnits: {},

    weight: {
      type: INT,
    },

    // lbs or kgs
    weightUnits: {},

    //   would this be an array?
    closet: {},

    img: {},

    following: [],

    followers: [],
// do we need this ?
    savedItems: [itemSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
}


const User = model("User", userSchema);

module.exports = User;
