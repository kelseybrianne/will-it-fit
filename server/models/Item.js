const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  itemId: {
    type: ID,
  },
  category: {
    type: String,
    required: true
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
    required: true
    // air jordans
  },
  gender: {
    type: String,
    // [mens, womans or unisex]
  },
  size: {
    type: String,
    required: true
    // [medium tall, 4, xxl, ps, 8L]
  },
  link: {
    type: String,
    // url
  },
  photo: {
    type: String,
    // pic of clothing
  },
  color: {
    type: String,
    // [black, white, grey, red, orange, yellow, green, blue, purple, pink]
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlenght: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Item = model('Item', itemSchema);

module.exports= Item;
