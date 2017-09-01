'use strict';

const routes = require('express').Router();
const user = require('../controllers/user.js');
const auth = require('./permissions.js');

routes.route('/users')
  .get(user.listAllUsers)

module.exports = routes;
