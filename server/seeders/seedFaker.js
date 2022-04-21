const db = require('../config/connection');
const { User, Item } = require('../models');
const { faker } = require('@faker-js/faker');

const category = [
  'shoes',
  'sweater',
  'top',
  'bottom',
  'pants',
  'dress',
  'shorts',
  'sweatshirt',
  'skirt',
  'jacket',
  'coat',
  'shirt',
];

function randomCategory() {
  const index = Math.floor(Math.random() * 11);
  return category[index];
}

const genderOptions = ['mens', 'womens', 'any'];
function gender() {
  const index = Math.floor(Math.random() * 2);
  return genderOptions[index];
}

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Item.deleteMany({});

    // console.log(itemIndex());
    for (let i = 0; i < 250; i++) {
      // make a bunch of user data
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const name = [firstName, lastName].join('');

      let newUser = new User({
        username: name,
        email: faker.internet.email(),
        password: 'password',
        weight: faker.mersenne.rand(100, 300),
        height: faker.mersenne.rand(55, 85),
        primaryPhoto: faker.image.avatar(),
        closet: [],
        savedItems: [],
      });

      await newUser.save();

      for (let i = 0; i < 5; i++) {
        let item = {
          category: randomCategory(),
          style: faker.commerce.productAdjective(),
          brand: faker.commerce.productMaterial(),
          name: faker.commerce.productName(),
          gender: gender(),
          size: faker.mersenne.rand(0, 20),
          link: faker.internet.url(),
          photo: 'https://source.unsplash.com/300x200?clothes',
          color: faker.internet.color(),
          review: faker.commerce.productDescription(),
          height: newUser.height,
          weight: newUser.weight,
          user_id: newUser._id,
        };
        let itemData = await Item.create(item);
        newUser.closet.push(itemData._id);
      }
      // create saved Items
      for (let i = 0; i < 5; i++) {
        let item = {
          category: randomCategory(),
          style: faker.commerce.productAdjective(),
          brand: faker.commerce.productMaterial(),
          name: faker.commerce.productName(),
          gender: gender(),
          size: faker.mersenne.rand(0, 20),
          link: faker.internet.url(),
          photo: faker.image.fashion(),
          color: faker.internet.color(),
          review: faker.commerce.productDescription(),
          height: newUser.height,
          weight: newUser.weight,
          user_id: newUser._id,
        };
        let itemData = await Item.create(item);
        newUser.savedItems.push(itemData._id);
      }

      // save the closet and savedItems to the user in the database
      await newUser.save();
    }
    // get 10 random user ID's

    const followingId = await User.aggregate([{ $sample: { size: 10 } }]);
    let list = [];
    for (i = 0; i < followingId.length; i++) {
      list.push(followingId[i]._id);
    }

    const followerId = await User.aggregate([{ $sample: { size: 10 } }]);
    let list2 = [];
    for (i = 0; i < followerId.length; i++) {
      list2.push(followerId[i]._id);
    }

    console.log(list);
    console.log(list2);
    // push 10 users into each us Array.

    await User.updateMany(
      {},
      {
        $addToSet: {
          following: list,
          followers: list2,
        },
      }
    );

    console.log('Database seeded! :)');
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

// // For each of the users that exist, add 2 items.
// tags.forEach(() => makePost(getRandomPost(50)));
