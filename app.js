var express = require('express');
var socket = require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var connect = require('connect');
var MongoStore = require('connect-mongo')(session);


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

/*404页面*/
app.use(function (req, res) {
  req.session.user={
    'name':'name'
  };
  req.session.data={
    'data':'data'
  };
  res.send('404');
});

/*socket.io配置&web服务器*/

var port = (process.env.PORT || 3000);
var io = socket.listen(app.listen(port));
io.sockets.on('connection', function (socket) {
  socket.emit('connected');
});
