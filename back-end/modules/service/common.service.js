var crypto=require('crypto');

var common=function () {
  this.name="common functions";
  /*Hmac加密*/
  this.Hmac=function (value,key) {
    return crypto.createHmac('sha1',key).update(value).digest('hex');
  };
};

module.exports=new common;
