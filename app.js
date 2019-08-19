let createError = require('http-errors');
let express = require('express');
let path = require('path');
var bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let articleRouter = require('./routes/article');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article',articleRouter);

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

//importation de la base de donnees
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Kira:KiraKiritto@cluster0-afmzx.gcp.mongodb.net/budo237?retryWrites=true&w=majority',{ useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err));


module.exports = app;
