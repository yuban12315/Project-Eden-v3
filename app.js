var express = require('express');
var socket = require('socket.io');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var port = (process.env.PORT || 3000);

/*配置Node.js后台*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cookieParser('Project-Eden'));
app.use(session({secret: 'Project-Eden', cookie: {maxAge: 3600 * 1000}}));
app.use(express.static(__dirname + '/www'));

/*404页面*/
app.use(function (req, res) {
  res.send('404');
});

/*socket.io配置*/
var io = socket.listen(app.listen(port));
io.sockets.on('connection',function (socket) {
  socket.emit('connected');
});
