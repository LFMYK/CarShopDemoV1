'use strict';

var express = require('express');
var port = 3000;
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carShop');



var path = require('path');

var morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client')));

app.locals.moment = require('moment');

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));


require('./routes')(app);

app.locals.appTitle = '汽车商城';

app.listen(port);

console.log('汽车商城网站服务已启动,监听端口号:'+port);


mongoose.set('debug',true);

app.locals.pretty=true;

if (process.env.NODE_ENV === 'development') {

  mongoose.set('debug', true);

  require('express-debug')(app, {
    depth: 4,
    panels: ['locals', 'request', 'session', 'template', 'software_info', 'nav']
  });

  var errorhandler = require('errorhandler');
  app.use(errorhandler);

}

