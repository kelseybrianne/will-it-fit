// eslint-disable-next-line no-unused-vars
const { Schema, model } = require('mongoose');
let filter = require('leo-profanity');

const itemSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      // [footwear, head wear, top, bottom, dress, etc...]
    },
    style: {
      type: String,
      //  [ casual, formal, athletic ...]
    },
    brand: {
      type: String,
      // nike
    },
    name: {
      type: String,
      required: true,
      // air jordans
    },
    gender: {
      type: String,
      // [mens, womans or unisex]
    },
    size: {
      type: String,
      required: true,
      // [medium tall, 4, xxl, ps, 8L]
    },
    link: {
      type: String,
      // url
    },
    photo: {
      type: String,
      required: true,
    },

    // pic of clothing
    color: {
      type: String,
      // [black, white, grey, red, orange, yellow, green, blue, purple, pink]
    },
    review: {
      type: String,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    review: {
      type: String,
    },
  },
  { timestamps: true }
);

itemSchema.pre('save', function (next) {
  this.brand = filter.clean(this.brand);
  this.name = filter.clean(this.name);
  this.size = filter.clean(this.size);
  this.link = filter.clean(this.link);
  this.review = filter.clean(this.review);

  next();
});

const Item = model('Item', itemSchema);

module.exports = Item;
