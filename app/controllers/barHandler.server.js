'use strict';

var https = require('https'),
    Users = require('../models/users.js'),
    YelpTokens = require('../models/YelpTokens.js'),
    configAuth = require('../config/auth');

function BarHandler () {
    var self = this;

    this.obtainToken = function (done) {
        var data = 'client_id=' + configAuth.yelpAuth.clientID
                + '&client_secret=' + configAuth.yelpAuth.clientSecret
                + '&grant_type=client_credentials',
            options = {
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
            // console.log('STATUS: ', res.statusCode);
            // console.log('HEADERS: ', JSON.stringify(res.headers));

            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                // console.log('BODY: ', chunk);
                var json = JSON.parse(chunk);
                // console.log('josn: ', json);
                var token = {
                    accessToken: json.access_token,
                    expiresIn: json.expires_in,
                    tokenType: json.token_type
                }
                done(null, token);
            });
            res.on('end', function () {
                // console.log('No more data in response.');
            });
        });

        req.on('error', function (e) {
            console.error('problem with request: ', e.message);
        });

        // write data to request body
        req.write(data);
        req.end();
    }

    this.readToken = function (done) {
        // read token from storage
        YelpTokens.findOne({ 'id': 1 }, { '_id': false })
        .exec(function (err, token) {
            if (err) { throw err; }

            // console.log('readToken(): token = ', token);

            if (!token) {
                // if token not found or expired, obtain new token
                self.obtainToken(function(err, result) {
                    // console.log('obtainToken(): result = ', result);
                    token = result;

                    var newToken = new YelpTokens();
                    newToken.accessToken = result.accessToken;
                    newToken.expiresIn = result.expiresIn;
                    newToken.tokenType = result.tokenType;

                    newToken.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newToken);
                    });
                });
            } else {
                done(null, token);
            }
        });
    }

    this.search = function (req, res) {
        // obtain valid token
        self.readToken(function (err, result) {
            // console.log('readToken(): result = ', result);

            // call search API with token
            console.log('request body: ', req.body);
            var data = {
                location: req.body.location,
                categories: 'bars'
            };

            res.json('temp result');
        });

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
