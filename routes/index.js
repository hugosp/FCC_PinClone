'use strict';

module.exports = function(app, passport) {
    var Pin     = require('../models/pins');

    app.get('/', function(req, res) {
        res.sendFile('index.html');
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
        Pin.find().sort({stars: -1}).exec(function(err,data) {
            res.json(data);
        });
    }); 

    app.post('/delete',function(req,res) {
        Pin.findOneAndRemove({_id:req.body.id},function(err){
            if (err) throw err;
            res.send('deleted');
        });
    });

    
    app.post('/star',function(req,res) {
        console.log(req.body.stars);
        Pin.findOneAndUpdate({_id:req.body.id},{$inc:{stars:1}},{new: true},function(err,doc){
            if (err) throw err;
            console.log(doc);
            res.send('added star'+doc);
        });
    });

    // --------------------- HANDLE LOGINS/AUTH ---------------------------- 

    app.get('/profile', isLoggedIn, function(req, res) {
        res.send(res.locals.user.twitter);
    });

    app.get('/error', isLoggedIn, function(req, res) {
        res.send('Error Logging in :/');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', { 
        successRedirect : '/', 
        failureRedirect : '/error' 
    }));
    
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }
}

