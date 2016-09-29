var TwitterStrategy = require('passport-twitter').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL
        
    },
    function(token, tokenSecret, profile, done) {
       process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    console.log(profile);
                    var newUser                         = new User();
                    newUser.twitter.id                  = profile.id;
                    newUser.twitter.token               = token;
                    newUser.twitter.username            = profile.username;
                    newUser.twitter.displayName         = profile.displayName;
                    newUser.twitter.img                 = profile.photos[0].value;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
