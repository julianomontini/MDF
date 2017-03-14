var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String}
});

schema.plugin(mongooseValidator);
module.exports = mongoose.model('User',schema);