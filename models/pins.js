var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pinSchema = new Schema({
    userId      : String,
    description : String,
    stars       : Number,
    url         : String
});

module.exports = mongoose.model('Pin', pinSchema);
