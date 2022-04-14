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
    let itemData = [];
    for (let i = 0; i < 1000; i++) {
      let items = {
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
      itemData.push(items);
    }
    await Item.insertMany(itemData);
    console.log('Items seeded! :)');

    // make a bunch of user data
    let userData = [];
    for (let i = 0; i < 500; i++) {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      let newDay = {
        username: [firstName, lastName].join(''),
        email: faker.internet.email(),
        password: faker.internet.password(),
        weight: randomIntFromInterval(100, 400),
        height: randomIntFromInterval(55, 85),
        primaryPhoto: faker.image.avatar(),
      };
      // for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
      //   let weight = {
      //     weight: randomIntFromInterval(100, 400),
      //   };
      //   newDay.push(weight);
      userData.push(newDay);
    }
    await User.insertMany(userData);
    console.log('Database seeded! :)');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
