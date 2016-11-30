var async = require('async');
var crypto=require('crypto');
var User = require('../schema/user.schema');
var func = function () {
  /*用户注册*/
  this.create=function(data, callback) {
    var user = new User(data);
    async.waterfall([
      function (callback) {
        //表单判断与加密password
          var flag=1;
          if(data.UserName.length==0){
            flag=0;
          }
          if(data.PassWord.length==0){
            flag=0;
          }
          if(flag==1){
            callback(null,'continue');
          }
          else{
            callback(new Error('注册信息有误'),null);
          }
      },
      function (err,callback) {
        User.find({
          UserName: data.UserName
        }, function (err, docs) {
          if (docs.length == 0) {
            callback(null, 'continue');
          } else {
            callback(new Error('用户已存在'), null);
          }
        })
      }, function (msg, callback) {
        user.save(function (err) {
          callback(err,"注册成功");
        })
      }
    ], function (err, result) {
      callback(err,result);
    })
  };
/*用户登录*/
  this.login=function () {

  };
/*用户状态检查(未登录/在别处登录)*/
/*用户退出登录*/
};


module.exports =new func();
