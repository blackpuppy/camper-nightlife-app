'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    users: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Bar', Bar);
