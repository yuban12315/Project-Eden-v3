var request=require('superagent');
var async=require('async');
var baseUrl='http://127.0.0.1:3000';

request.get(baseUrl).end(function (err,res) {
  if(err){
    console.log(err)
  }
  else{
    console.log(res.text)
  }
});
