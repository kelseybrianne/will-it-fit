const db = require('../config/connection');
const { User, Item } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const itemSeeds = require('./itemSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(profileSeeds);
    await Item.deleteMany({});
    await Item.create(itemSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
