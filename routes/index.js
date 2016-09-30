'use strict';

module.exports = function(app, passport) {
    var Pin     = require('../models/pins');
    var User     = require('../models/user');

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
        console.log(req.query.id);
        if(req.query.id =='undefined') {
            Pin.find().sort({_id: -1}).exec(function(err,data) {
                res.json(data);
            });
        } else {
            Pin.find({userId:req.query.id}).exec(function(err,data) {
                res.json(data);
            });
        }
    }); 

    app.post('/delete',function(req,res) {
        Pin.findOneAndRemove({_id:req.body.id},function(err){
            if (err) throw err;
            res.send('deleted');
        });
    });

    app.get('/userimg',function(req,res) {
        User.find({},'twitter.id twitter.img twitter.username',function(err,data){
            var temp =[];
            for(var i=0;i<data.length;i++) {
                temp.push({id:data[i].twitter.id,img:data[i].twitter.img,username:data[i].twitter.username});
            }
            res.json(temp);
        })
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

