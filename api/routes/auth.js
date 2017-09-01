'use strict';

const routes = require('express').Router();
const passport = require('passport');
const auth = require('../controllers/auth.js');

routes.route('/auth/login')
  .post(auth.login);

routes.route('/auth/current')
  .get(passport.authenticate('jwt', { session: false }), auth.currentUserInfo);


module.exports = routes;
