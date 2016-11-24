var async = require('async');
var Person = require('../schema/PersonSchema');
var func = {
  /*创建用户Person*/
    create: function (data, callback) {
        var person = new Person(data);
        async.waterfall([
            function (callback) {
                Person.find({
                    UserName: data.UserName
                }, function (err, docs) {
                    if (docs.length == 0) {
                        callback(null, 'continue');
                    } else {
                        callback(new Error('用户已存在'), null);
                    }
                })
            }, function (msg, callback) {
                person.save(function (err) {
                    console.log(msg);
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, '注册成功');
                    }
                })
            }
        ], function (err, result) {
            if (!err) {
                callback(null, result);
            }
            else {
                callback(err, null);
            }
        })
    }
};
module.exports = func;
