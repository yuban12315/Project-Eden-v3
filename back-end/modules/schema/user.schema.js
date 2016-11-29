var mongoose = require('../mongo');
var UserSchema = new mongoose.Schema({
  UserName: String,
  PassWord: String,
  NickName: {
    type: String,
    default: '昵称'
  },
  Intro: String,
  Avatar: {
    type: String,
    default: 'http://ocxi5zst0.bkt.clouddn.com/test-avatar.png'
  },
  Point: {
    type: Number,
    default: 0
  },
  Following: [{
    Id: {
      type: String,
      default: null
    }
  }
  ],
  Follower:[{
    Id: {
      type: String,
      default: null
    }
  }
  ]
}, {collection: 'User'});
module.exports = mongoose.model('User', UserSchema);
