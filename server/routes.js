'use strict';

var indexController = require('./controllers/index');
var carController = require('./controllers/car');

var userController = require('./controllers/user');


module.exports = function(app) {


  app.use(function(req, res, next) {
    var _user = req.session.loginuser;
    res.locals.loginuser = _user;
    next();
  });


  
  app.get('/', indexController.index);
  app.get('/car/:id', carController.showDetail);


/*
  app.get('/admin/car/list', carController.showList);
  app.get('/admin/car/new', carController.new);
  app.get('/admin/car/update/:id', carController.update);
  app.post('/admin/car', carController.post);
    // /admin/list?id=xxxxx
  app.delete('/admin/car/list', carController.del);
*/

  app.get('/admin/car/list', userController.requireSignin, userController.requireAdmin, carController.showList);

  app.get('/admin/car/new', userController.requireSignin, userController.requireAdmin, carController.new);
  app.get('/admin/car/update/:id', userController.requireSignin, userController.requireAdmin, carController.update);

  app.post('/admin/car', userController.requireSignin, userController.requireAdmin, carController.post);

  // /admin/list?id=xxxxx
  app.delete('/admin/list', userController.requireSignin, userController.requireAdmin, carController.del);



  app.get('/logout', userController.logout);
  


  app.get('/signup',userController.showSignup);//在这增加
  app.get('/signin', userController.showSignin);
  
  app.post('/signup', userController.postSignup);
  app.post('/signin', userController.postSignin);
};