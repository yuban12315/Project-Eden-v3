var express = require('express');
var common = require('../modules/service/common.service');
var router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body)
  res.send('sdsd');
});
router.get('/', (req, res)=> {
  res.send('<h1>test-url-get</h1>');
})
router.get('/buffer', (req, res)=> {
  var captcha = common.getCaptcha();
  res.send(captcha[1]);
});
router.get('/test',(req,res)=>{

});

module.exports = router;
