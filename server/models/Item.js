// eslint-disable-next-line no-unused-vars
const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
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

});

const Item = model('Item', itemSchema);

module.exports = Item;
