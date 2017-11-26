'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
	id: String,
    users: [String]
});

module.exports = mongoose.model('Bar', Bar);
