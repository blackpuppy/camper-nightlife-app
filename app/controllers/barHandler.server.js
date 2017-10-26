'use strict';

var Users = require('../models/users.js');

function BarHandler () {

    this.search = function (req, res) {
        // Users
        //     .findOneAndUpdate({ 'twitter.id': req.user.twitter.id }, { $inc: { 'nbrClicks.clicks': 1 } })
        //     .exec(function (err, result) {
        //             if (err) { throw err; }

        //             res.json(result.nbrClicks);
        //         }
        //     );
    };

}

module.exports = BarHandler;
