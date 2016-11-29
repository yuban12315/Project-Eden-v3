var mongoose=require('mongoose');
/*配置mongodb*/
mongoose.connect('mongodb://127.0.0.1/Project-Eden-Test');
module.exports=mongoose;
