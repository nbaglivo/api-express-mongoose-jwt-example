'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.listAllUsers = function(req, res) {
  User.find({})
  	.then(users => res.status(200).json(users))
  	.catch(error => res.status(400).send(error));
};
