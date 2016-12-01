var express = require('express');
var socket = require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);
var test_router=require('./back-end/routes/test');

/*配置Node.js后台*/
var app = express();
app.use(logger('dev'));//http请求记录
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cookieParser('Project-Eden'));
app.use(session({
  secret: 'Project-Eden',
  cookie: {maxAge: 365*3600 *24* 1000},
  store:new MongoStore({
    url:'mongodb://127.0.0.1:27017/mongo-session'
  })
}));
app.use(express.static(__dirname + '/www'));//静态文件

/*routers*/
app.use('/test',test_router);

/*404页面*/
app.use(function (req, res) {
  res.send('404');
});


module.exports=app;
