var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
//var bcrypt = require('bcrypt');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var sequelize = new Sequelize('nodeTest','root','root',{dialect:'mysql'});
var testTable = sequelize.define('test_table',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING
  }
},{
  freezeTableName: true,
  timestamps: false
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

//app.use('/', indexRouter);
app.use('/users', usersRouter);

//sql query add
app.get('/',function(req, res, next){
  testTable.findAll().then(results => {
    res.send(results);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Foud');
  err.status = 404;
  next(err);
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
