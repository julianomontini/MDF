var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    nome: {type: String, required: true},
    produtos: {}
});

module.exports = mongoose.model('Categoria',schema);