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

const images = [
  'https://unsplash.com/photos/-uJ3N7HLiEg',
  'https://unsplash.com/photos/0UECcInuCR4',
  'https://unsplash.com/photos/xZSEvSlHRv8',
  'https://unsplash.com/photos/jC7nVH_Sw8k',
  'https://unsplash.com/photos/1rwF1RX7mbg',
  'https://unsplash.com/photos/APpHYr9TcMA',
  'https://unsplash.com/photos/txy8AZU04iw',
  'https://unsplash.com/photos/k6aQzmIbR1s',
  'https://unsplash.com/photos/6PJ0Pi43HFE',
  'https://unsplash.com/photos/tBDwxspVp7A',
  'https://unsplash.com/photos/NCf_mwCXq4s',
  'https://unsplash.com/photos/spyYrp2y7Ao',
  'https://unsplash.com/photos/rygrPAseHmY',
  'https://unsplash.com/photos/KNeZ-p90bQA',
  'https://unsplash.com/photos/OCmNJnFx44U',
  'https://unsplash.com/photos/aiI9YfIWhoc',
  'https://unsplash.com/photos/XM_zJuffRvI',
  'https://unsplash.com/photos/YhjJ_6UlknU',
  'https://unsplash.com/photos/Y9WVpVdZMLY',
  'https://unsplash.com/photos/HxUbEr2lmYY',
  'https://unsplash.com/photos/UW1NMEXThHg',
  'https://unsplash.com/photos/6NVrH0HB_DE',
  'https://unsplash.com/photos/cLii71lpzr4',
  'https://unsplash.com/photos/2smIJSbqOfE',
  'https://unsplash.com/photos/uED_eXXHNuQ',
  'https://unsplash.com/photos/kWmLbazpO58',
  'https://unsplash.com/photos/lIRJBv2wI60',
  'https://unsplash.com/photos/dwKiHoqqxk8',
  'https://unsplash.com/photos/PqbL_mxmaUE',
  'https://unsplash.com/photos/Y4fKN-RlMV4',
  'https://unsplash.com/photos/87DgFV9SOc4',
  'https://unsplash.com/photos/g3CMh2nqj_w',
  'https://unsplash.com/photos/q4ExhrHaSLY',
  'https://unsplash.com/photos/GIJilzvYLP8',
  'https://unsplash.com/photos/Hng0RpHDgHI',
  'https://unsplash.com/photos/CjB-8NY5at8',
  'https://unsplash.com/photos/WIWVM_Z1x7c',
  'https://unsplash.com/photos/Lss2BdwBKho',
  'https://unsplash.com/photos/6TIoPIpMvLc',
  'https://unsplash.com/photos/iQsdMs7kIA8',
  'https://unsplash.com/photos/qQB04yQdosk',
  'https://unsplash.com/photos/i49yJtWD57w',
  'https://unsplash.com/photos/HXADYXS-fLo',
  'https://unsplash.com/photos/Ej0mAvW6GWM',
  'https://unsplash.com/photos/X2UprmSxIHQ',
  'https://unsplash.com/photos/9wM5SCjhsOM',
  'https://unsplash.com/photos/nYnwq0iN2jI',
  'https://unsplash.com/photos/d8eFSV4p6Og',
  'https://unsplash.com/photos/PPrPaki9cKo',
  'https://unsplash.com/photos/Pi_HEJgdMdA',
  'https://unsplash.com/photos/6EGcJ6CF3ko',
];

function randomCategory() {
  const index = Math.floor(Math.random() * 11);
  return category[index];
}

function randomPicture() {
  const index = Math.floor(Math.random() * 49);
  return images[index];
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
          photo: randomPicture(),
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
