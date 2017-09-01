const mongooseLib = require('mongoose');
const config = require('./config');
const UsersSeeder = require('./seeders/users.seeder');

mongooseLib.Promise = global.Promise;

module.exports = {
  mongoose: mongooseLib,
  mongoURL: config.database,
  seedersList: {
    Users: UsersSeeder
  }
};
