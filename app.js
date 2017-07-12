const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const index = require('./routes/index');

const app = express();

if('development' === app.get('env')) {
    mongoose.set('debug', true);
    app.use(logger('dev'));
}

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${'development' === app.get('env') ? 'localhost' : 'mongo-pill'}/pill`);

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const errorCode = err.status || 500;

  res.status(errorCode);
  res.json({ status: 'error', code: errorCode });
});

module.exports = app;
