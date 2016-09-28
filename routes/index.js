'use strict';

module.exports = function(app, passport) {
    var Pin     = require('../models/pins');

    app.get('/', function(req, res) {
        res.sendFile('index.html');
    });

   
    app.get('/profile', isLoggedIn, function(req, res) {
        res.send(res.locals);
    });
    app.get('/error', isLoggedIn, function(req, res) {
        res.send('Error Logging in :/');
    });

    app.post('/insert',function(req,res) {
        console.log(req.body);
        var newPin = new Pin ({
            url: req.body.url,
            description: req.body.description,
            userId: req.body.userId,
            stars: 0
        });
        newPin.save(newPin,function(err,data) {
            res.send('inserted : '+data);
        });
    });

    app.get('/get',function(req,res) {
        Pin.find({},function(err,data) {
            res.json(data);
        });
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

