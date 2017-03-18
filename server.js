const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// connect to our local database called data
mongoose.connect("mongodb://localhost:27017/data");

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'hbs');

// logs all requests
app.use(logger('dev'));

// tell the app to parse HTTP body messages
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*'); // donner l'accès à tout
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // accepter ces méthodes 
  res.setHeader('Access-Control-Allow-Headers', 'X-requested-With, content-type, Authorization'); // accepter les XML
  next();
});

// tell the app to look for static files in these directories
app.use(express.static(path.join(__dirname, '/server/public')));

// routes
const indexRoute = require('./server/routes/index');
app.use(indexRoute);

const postRoute = require('./server/routes/post');
app.use(postRoute);


// catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

});

// start the server
app.listen(port, () => {
	console.log('Server started! At http://localhost:'+ port);
});

module.exports = app;