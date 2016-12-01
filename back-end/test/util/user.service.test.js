var UserService = require('../../modules/service/user.service');
var login_data = {
  'UserName': 'test_1',
  'PassWord': 'pass_1'
};
UserService.login(login_data, (err, result) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log(result)
  }
});
