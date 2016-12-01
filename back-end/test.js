var async = require('async');

console.log('test start------------');
async.waterfall([
  function (cb) {
    console.log('test1--success situation');
    cb(null,'continue');
  },
  function (arg1,cb) {
    console.log('test2--error situation')
    cb(new Error('test error'),null);
  },
  function (cb) {
    console.log('should not exist' );
    cb(null,'error')
  }

], function (err, result) {
  if(err){
    console.log(err)
  }
  console.log('test end------------')
});
