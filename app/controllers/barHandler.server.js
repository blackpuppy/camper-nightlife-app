'use strict';

var https = require('https'),
    Users = require('../models/users.js'),
    YelpTokens = require('../models/YelpTokens.js'),
    configAuth = require('../config/auth'),
    ajaxFunctions = require('../common/ajax-functions-server.js');

function BarHandler () {
    var self = this;

    this.obtainToken = function (req, res) {
        var apiUrl = 'https://api.yelp.com/oauth2/token',
            data = 'client_id=' + configAuth.yelpAuth.clientID
                + '&client_secret=' + configAuth.yelpAuth.clientSecret
                + '&grant_type=client_credentials';
        // ajaxFunctions.ajaxRequest('POST', apiUrl, function (result) {
        //     console.log('obtainToken(): result = ', result);
        // }, data);

        var options = {
            hostname: 'api.yelp.com',
            // protocol: 'https',
            port: 443,
            path: '/oauth2/token',
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var req = https.request(options, function (res) {
            console.log('STATUS: ', res.statusCode);
            console.log('HEADERS: ', JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ', chunk);
            });
            res.on('end', function () {
                console.log('No more data in response.');
            });
        });

        req.on('error', function (e) {
            console.error('problem with request: ', e.message);
        });

        // write data to request body
        req.write(data);
        req.end();
    }

    this.readToken = function (req, res) {
        // read token from storage
        YelpTokens.findOne({ 'id': 1 }, { '_id': false })
        .exec(function (err, token) {
            if (err) { throw err; }

            console.log('readToken(): token = ', token);

            if (!token) {
                // if token not found or expired, obtain new token
                self.obtainToken(req, res);
            }

            res.json(token);
        });
    }

    this.search = function (req, res) {
        // obtain valid token
        self.readToken(req, res);

        // call search API with token

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
