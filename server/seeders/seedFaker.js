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

    let userData = [];
    // console.log(itemIndex());
    for (let i = 0; i < 5; i++) {
      // make a bunch of user data

      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const name = [firstName, lastName].join('');

      let closetData = [];
      for (let i = 0; i < 10; i++) {
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
        };
        let itemData = await Item.create(item);
        closetData.push(itemData._id);
      }
      // create saved Items
      let savedItemData = [];
      for (let i = 0; i < 10; i++) {
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
        };
        let itemData = await Item.create(item);
        savedItemData.push(itemData._id);
      }

      let newUser = {
        username: name,
        email: faker.internet.email(),
        password: 'password',
        weight: faker.mersenne.rand(100, 300),
        height: faker.mersenne.rand(55, 85),
        primaryPhoto: faker.image.avatar(),
        closet: closetData,
        savedItems: savedItemData,
        followers: [],
        following: [],
      };
      userData.push(newUser);
    }

    // // For each of the users that exist, add 2 items.
    // tags.forEach(() => makePost(getRandomPost(50)));

    await User.create(userData);

    console.log('Database seeded! :)');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
