const db = require('../config/connection');
const { User, Item } = require('../models');
const { faker } = require('@faker-js/faker');

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
    // make a bunch of user data
    let userData = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

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
        console.log('itemData', itemData._id);
        closetData.push(itemData._id);
      }

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
        console.log('itemData', itemData._id);
        savedItemData.push(itemData._id);
      }

      let newUser = {
        username: [firstName, lastName].join(''),
        email: faker.internet.email(),
        password: faker.internet.password(),
        weight: randomIntFromInterval(100, 400),
        height: randomIntFromInterval(55, 85),
        primaryPhoto: faker.image.avatar(),
        closet: closetData,
        savedItems: savedItemData,
      };
      userData.push(newUser);
    }

    await User.insertMany(userData);

    console.log('Database seeded! :)');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
