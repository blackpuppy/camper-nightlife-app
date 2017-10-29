'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var YelpToken = new Schema({
    accessToken: String,
    expiresIn: Number,
    token_type: String
});

module.exports = mongoose.model('YelpToken', YelpToken);
