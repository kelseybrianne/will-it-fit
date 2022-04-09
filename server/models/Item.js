const { Schema } = require("mongoose");

const itemSchema = new Schema({
  itemId: {
      
  },
  category: {
    // [footwear, head wear, top, bottom, dress, etc...]
  },
  style: {
    //  [ casual, formal, athletic ...]
  },
  brand: {
    // nike
  },
  name: {
    // air jordans
  },
  gender: {
    // [mens, womans or unisex]
  },
  size: {
    // [medium tall, 4, xxl, ps, 8L]
  },
  link: {},
  img: {},
  color: {
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
          required: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp)
      }
    },
  ],
});

module.exports = itemSchema;
