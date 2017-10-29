'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YelpToken = new Schema({
    accessToken: String,
    expiresIn: Number,
    tokenType: String
});

module.exports = mongoose.model('YelpToken', YelpToken);
