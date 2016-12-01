var crypto=require('crypto');
var ccap=require('ccap');

var common=function () {
  this.name="common functions";
  /*Hmac加密*/
  this.Hmac=function (value) {
    return crypto.createHmac('sha1','Project-Eden').update(value).digest('hex');
  };
  /*图片验证码*/
  this.getCaptcha=function () {
    return ccap().get();
  }
};

module.exports=new common();
