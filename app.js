var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbars = require('express-handlebars');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);


var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/orders');


var app = express();
mongoose.connect("mongodb://localhost:27017/Restaurant", { useNewUrlParser: true });

// view engine setup
app.engine('.hbs',expressHbars({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'My Secret', 
  resave: false, 
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180*60*1000}
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',userRouter);
app.use('/cart',cartRouter);


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

app.use(function(req, res, next)
{
  res.locals.session = req.session;
  next();
});

module.exports = app;
