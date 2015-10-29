'use strict';

var ModelUser = require('../models/user');//这里加

module.exports.showSignin = function(req, res, next) {
  res.render('signin', {
    title: '汽车商城 登录页',
    user: {}
  });
};

module.exports.showSignup = function(req, res, next) {
  res.render('signup', {
    title: '汽车商城 注册页',
    user: {}
  });
};



module.exports.postSignin = function(req, res, next) {
  var userObj = req.body.user;
  if (!userObj) {
    return res.status(400).send('找不到合法数据.');
  }

  var name = userObj.name;
  var inputpw = userObj.password;
  ModelUser.findOne({
    name: name
  }, function(err, _user) {
    if (err) {
      console.log('登陆：错误查找时出错！');
      console.log(err);
      return res.redirect('/signup');
    }
    if (!_user) {
      console.log('登陆：错误用户找不到！');
      return res.redirect('/signup');

    }
    _user.comparePassword(inputpw, function(err, isMatch) {
      if (err) {
        console.log('登陆：错误密码不对！');
        console.log(err);
        return res.redirect('/signin');
      }
      if(isMatch){
        console.log('用户: %s 登录验证成功.', name);
        return res.redirect('/');
      }else{
        return res.redirect('/signin');
      }
    });
  });
};




module.exports.postSignup = function(req, res, next) {
  var userObj = req.body.user;
  if (!userObj) {
    console.log('注册：找不到合法数据！');
    return res.status(400).send('找不到合法数据.');
  }
  var docUser = new ModelUser(userObj);
  docUser.save(function(err, _user) {
    if (err) {
      console.log('注册：用户已存在！');
      res.locals.syserrmsg = '用户名已存在，不能完成注册';
      // return next(err);
      return module.exports.showSignup(req, res, next);
    }
    console.log('注册：这里是成功的！');
    //req.session.user = _user;
    return res.redirect('/');

  });
};