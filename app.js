var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// R层
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dataRouter = require('./routes/data');
var userListRouter = require('./routes/userList');    // 用户列表管理
var orderListRouter = require('./routes/orderList');  // 订单列表管理
var seatRouter = require('./routes/seat');            // 座位管理
var collectionListRouter = require('./routes/collectionList');            // 座位管理

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');  // 模板引擎

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/userList', userListRouter);
app.use('/orderList', orderListRouter);
app.use('/seat', seatRouter);
app.use('/collectionList', collectionListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
