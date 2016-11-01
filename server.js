'use strict';

var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var passport    = require('passport');
var session     = require('express-session');
var morgan      = require('morgan');

require('dotenv').config();
require('./config/passport.js')(passport);

var port      = process.env.PORT || 4000;
var app       = express();

mongoose.connect(process.env.MONGOLAB_URI);

app.use(morgan('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(process.cwd() + '/public'));

app.use(session({secret: 'fiskballe',resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {      // send req.user to all routes
  res.locals.user = req.user;
  next();
});


require('./routes/index')(app,passport);

app.listen(port,function () {
  console.log('hej');
    console.log('Express running on port hej hej ' + port);
});

