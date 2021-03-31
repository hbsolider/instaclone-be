const faker = require('faker');
const bycrypt = require('bcrypt');
const salt = bycrypt.genSaltSync(11);

const password = bycrypt.hashSync('123456', salt);

const user = [...Array(25)].map((_, i) => ({
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  password,
  avatar: `https://source.unsplash.com/random/${i}`,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
user.push({
  id: '18e8afec-887c-418e-b419-d997b8e9cf6f',
  email: 'hoaibao@gmail.com',
  username: 'hoaibaodeptrai',
  password: password,
  fullname: 'SupperDeptrai',
  avatar: `https://source.unsplash.com/random/hoaibaodeptrai`,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const photo = [...Array(5)].reduce((pre, now) => {
  const res = user.map((value) => ({
    id: faker.datatype.uuid(),
    caption: faker.lorem.sentence(1, 2),
    image: `https://source.unsplash.com/random/${
      value.username + faker.datatype.number(9999)
    }`,
    userId: value.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return [...pre, ...res];
}, []);

const comment = [...Array(5)].reduce((pre, now) => {
  const res = photo.map((value) => ({
    comment: faker.lorem.sentence(2, 3),
    photoId: value.id,
    userId: value.userId,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  }));
  return [...pre, ...res];
}, []);

const like = photo.reduce((pre, now) => {
  const res = user.map((value) => ({
    userId: value.id,
    photoId: now.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return [...pre, ...res];
}, []);
const following = (follower, following) => ({
  id: faker.datatype.uuid(),
  follower,
  following,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const follow = user.reduce((pre, now) => {
  const fl = [];
  user.forEach((value) => {
    const num = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    if (num % 2 === 0) {
      if (value.id !== now.id) fl.push(following(now.id, value.id));
    } else {
      if (value.id !== now.id) fl.push(following(value.id, now.id));
    }
  });
  return [...pre, ...fl];
}, []);

module.exports = {
  user,
  comment,
  photo,
  like,
  follow,
  up: () => Promise.resolve(),
  down: () => Promise.resolve(),
};
