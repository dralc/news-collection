import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import collectionRouter from './routes/collection.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// List of all routes
app.use('/collection', collectionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Invalid route'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({ message: err.message || '', stack: err.stack || '' })
});

export default app;