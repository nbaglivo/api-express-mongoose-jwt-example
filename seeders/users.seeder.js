var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../api/models/user');

var data = [{
  username: 'user1',
  email: 'user1@gmail.com',
  password: '123a23',
  name: 'jorge',
  age: 20,
  bio: 'lala'
}, {
  username: 'user2',
  email: 'user2@gmail.com',
  password: '123a23',
  name: 'roberto',
  age: 23,
  bio: 'lala'
}, {
  username: 'user3',
  email: 'user3@gmail.com',
  password: '6c02ec',
  name: 'ramona',
  age: 22,
  bio: 'lalasar'
}, {
  username: 'user4',
  email: 'user4@gmail.com',
  password: '123a23',
  name: 'raul',
  age: 30,
  bio: 'lala'
}, {
  username: 'user5',
  email: 'user5@gmail.com',
  password: '123a23',
  name: 'marcela',
  age: 27,
  bio: 'lala'
}];

var UsersSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.count().exec().then(count => count === 0);
  },
  run: function () {
    return Model.create(data);
  }
});

module.exports = UsersSeeder;
