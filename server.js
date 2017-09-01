const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const config = require('./config');
const User = require('./api/models/user');
const initPassport = require('./api/config/passport');
const userRoutes = require('./api/routes/user');
const authRoutes = require('./api/routes/auth');

const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Init passport
app.use(passport.initialize());
initPassport(passport);

// Use morgan to log requests to the console
app.use(morgan('dev'));


// Connect all our routes
app.use('/api/', authRoutes);
app.use('/api/', userRoutes);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

app.listen(port);
