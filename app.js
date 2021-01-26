const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const token = require('./data/token');
const dbConnect = require('./data/database');
const { checkAuth } = require('./middleware/auth');
const zeroRouter = require('./routes/zero');

const app = express();
dbConnect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'sid',
  secret: token,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessionMongo',
  }),
  saveUninitialized: false, // предотвратит хранение пустых объектов сеанса в хранилище сеансов.
  cookie: {
    secure: false, // true для рабочей версии https
  },
}));

app.use('/', zeroRouter);
// app.use('/users', usersRouter);

app.get('/main', checkAuth, (req, res) => res.render('main'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
