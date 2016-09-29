var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String,
        img          : String
    }
});

module.exports = mongoose.model('User', userSchema);