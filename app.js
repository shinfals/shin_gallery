var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var con = mysql.createConnection({
  host: 'my-site-db',
  user: 'root',
  password: 'root',
  database: 'my-site-db'
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

//app.use('/', indexRouter);
app.use('/users', usersRouter);

//sql query add
app.use('/',function(req, res, next){
  var id = 5;
  var name = '\'shinshin\'';
  var age = 20;
  var sex = '\'man\'';
  var password = '\'PassPassPass\'';
  var query_str = `insert into member values (${id}, ${name}, ${age}, ${sex}, ${password})`;
  con.query(query_str, function(error, results, fields){
    if (error) throw error;
    console.log('insert success!');
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
