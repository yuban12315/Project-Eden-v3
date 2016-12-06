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
    url: 'mongodb://127.0.0.1:27017/Project-Eden-Test'
  })
}));
app.use(express.static(__dirname + '/www'));//static file

/*routers*/
app.use((req,res,next)=>{
  req.session.ip=req.ip.match(/\d+\.\d+\.\d+\.\d+/);//记录用户ip
  next();
});
app.use('/',test_router);
app.use('/test', test_router);

/*catch 404 pages*/
app.use((req, res,next)=> {
  var err=new Error('Not Found');
  err.status=404;
  res.send("用户IP："+req.session.ip);
});



module.exports = app;
