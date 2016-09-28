var mongoose = require('mongoose');

var pinSchema = mongoose.Schema({
    userId      : String,
    description : String,
    stars       : Number,
    url         : [String]
});

module.exports = mongoose.model('Pins', pinSchema);
