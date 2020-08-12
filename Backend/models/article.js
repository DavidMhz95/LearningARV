'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String
});

module.exports = mongoose.model('Article', articleSchema);
// articles --> guarda los documentos de tipo Article y con esta estructura dentro de la coleccion