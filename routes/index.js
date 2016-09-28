'use strict';

var Pin     = require('../models/pins');

module.exports = function(app, passport) {
    
    app.get('/', function(req, res) {
        res.send('hello Pin');
    });

   
    app.get('/profile', isLoggedIn, function(req, res) {
        res.send(res.locals);
    });
    app.get('/error', isLoggedIn, function(req, res) {
        res.send('Error Logging in :/');
    });
    
    
    
    
    // --------------------- HANDLE LOGINS/AUTH ---------------------------- 
    
    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') }); 
    });

   app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
        successRedirect : '/profile', 
        failureRedirect : '/error' 
    }));
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/login');
    }
}

