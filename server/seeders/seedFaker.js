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
    // let itemData = [];
    // for (let i = 0; i < 3; i++) {
    //   let items = {
    //     category: randomCategory(),
    //     style: faker.commerce.productAdjective(),
    //     brand: faker.commerce.productMaterial(),
    //     name: faker.commerce.productName(),
    //     gender: gender(),
    //     size: faker.mersenne.rand(0, 20),
    //     link: faker.internet.url(),
    //     photo: faker.image.fashion(),
    //     color: faker.internet.color(),
    //     review: faker.commerce.productDescription(),
    //   };
    //   itemData.push(items);
    // }
    // await Item.insertMany(itemData);
    // console.log('Items seeded! :)');

    // }
    let userData = [];
    // console.log(itemIndex());
    for (let i = 0; i < 5; i++) {
      // make a bunch of user data

      for (let i = 0; i < 2; i++) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const name = [firstName, lastName].join('');

        let itemData = [];
        for (let i = 0; i < 5; i++) {
          let items = {
            category: randomCategory(),
            style: faker.commerce.productAdjective(),
            brand: faker.commerce.productMaterial(),
            name: faker.commerce.productName(),
            gender: gender(),
            size: faker.mersenne.rand(0, 20),
            link: faker.internet.url(),
            photo: `https://loremflickr.com/640/480/outfit?random=${Math.round(
              Math.random() * 1000
            )}`,
            color: faker.internet.color(),
            review: faker.commerce.productDescription(),
          };
          itemData.push(items);
        }
        await Item.create(itemData);

        // // get list of newly created itemId's to pass through to user data.
        // const itemID = Item.find({}).distinct('_id', {});
        let itemID = [];
        const itemSearch = await Item.find({}).populate('_id', {});
        itemID.push(itemSearch);
        console.log(itemID);

        // call this function to return random item ID.
        function itemIndex() {
          const index = Math.floor(Math.random() * 4);
          return itemID[index];
        }

        let newDay = {
          username: name,
          email: faker.internet.email(),
          password: faker.internet.password(),
          weight: randomIntFromInterval(100, 400),
          height: randomIntFromInterval(55, 85),
          primaryPhoto: faker.image.avatar(),
          closet: itemIndex(),
          savedItems: itemIndex(),
          followers: [],
          following: [],
        };
        userData.push(newDay);
      }
    }
    // // For each of the users that exist, add 2 items.
    // tags.forEach(() => makePost(getRandomPost(50)));

    await User.insertMany(userData);

    console.log('Database seeded! :)');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
