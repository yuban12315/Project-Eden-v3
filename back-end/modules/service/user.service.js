var async = require('async');
var crypto = require('crypto');
var User = require('../schema/user.schema');
var Common = require('./common.service');
var UserService = function () {
  /*用户注册*/
  this.create = function (data, callback) {
    async.waterfall([
      function (callback) {
        //表单判断与加密password
        var flag = 1;
        if (data.UserName.length == 0 || data.PassWord.length <= 6) {
          flag = 0;
        }
        if (flag == 1) {
          callback(null, 'continue');
        }
        else {
          callback(new Error('注册信息有误'), null);
        }
      },
      function (msg, callback) {
        User.find({
          UserName: data.UserName
        }, (err, docs) => {
          if (docs.length == 0) {
            callback(null, 'continue');
          } else {
            callback(new Error('用户已存在'), null);
          }
        })
      },  (msg, callback)=> {
        data.PassWord = Common.Hmac(data.PassWord);//密码加密
        var user = new User(data);
        user.save((err) => {
          callback(err, "注册成功");
        })
      }
    ],  (err, result)=> {
      callback(err, result);
    })
  };
  /*用户登录*/
  this.login = function (data, callback) {
    async.waterfall([
      function (cb) {
        var flag = 1;
        if (data.UserName.length == 0 || data.PassWord.length == 0) {
          flag = 0;
        }
        if (flag == 1) {
          cb(null, 'continue');
        }
        else {
          cb(new Error('登录信息有误'), null);
        }
      },
      function (msg, cb) {
        User.find({
          UserName: data.UserName
        }, (err, docs)=> {
          if (docs.length == 0) {
            cb(new Error('用户不存在'), null);
          }
          else {
            data.PassWord = Common.Hmac(data.PassWord);
            if (docs[0].PassWord === data.PassWord) {
              cb(null, '登录成功')
            }
            else {
              cb(new Error('用户名或密码错误'), null)
            }
          }
        })
      }
    ], (err, result)=> {
      callback(err, result);
    })
  };
};

module.exports = new UserService();
