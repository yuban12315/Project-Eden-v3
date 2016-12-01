var express=require('express');
var router=express.Router();

router.post('/',function (req,res) {
  console.log(req.body)
  res.send('sdsd');
});
router.get('/',function (req,res) {
  res.send('<h1>test-url-get</h1>');
})

module.exports=router;
