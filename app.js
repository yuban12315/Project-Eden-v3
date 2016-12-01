var express = require('express');
var path=require('path');
var socket = require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);
var test_router = require('./back-end/routes/test');

//view engine setup

/* express configs*/
var app = express();
app.use(logger('dev'));//http requests logs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cookieParser('Project-Eden'));
app.use(session({
  secret: 'Project-Eden',
  cookie: {maxAge: 365 * 3600 * 24 * 1000},
  store: new MongoStore({
    url: 'mongodb://127.0.0.1:27017/mongo-session'
  })
}));
app.use(express.static(__dirname + '/www'));//static file

/*routers*/
app.use('/test', test_router);

/*404 pages=*/
app.use((req, res)=> {
  res.send('404');
});


module.exports = app;
