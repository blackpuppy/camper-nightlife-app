'use strict';

var axios = require('axios'),
    YelpTokens = require('../models/YelpTokens.js'),
    configAuth = require('../config/auth');

function BarHandler () {
    var self = this;

    this.obtainToken = function (done) {
        var data = 'client_id=' + configAuth.yelpAuth.clientID
                + '&client_secret=' + configAuth.yelpAuth.clientSecret
                + '&grant_type=client_credentials';

        axios.post('https://api.yelp.com/oauth2/token', data)
        .then(function (res) {
            // console.log('Yelp authentcation response.data: ', res.data);

            var token = {
                accessToken: res.data.access_token,
                expiresIn: res.data.expires_in,
                tokenType: res.data.token_type
            };
            done(null, token);
        })
        .catch(function (error) {
            console.error('Yelp authentcation error: ', error);
        })
    }

    this.readToken = function (done) {
        // read token from storage
        YelpTokens.findOne({}, { '_id': false })
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
            console.log('readToken(): token = ', result.accessToken);

            // call search API with token
            console.log('Search request body: ', req.body);

            var params = {
                    location: req.body.location,
                    categories: 'bars'
                },
                queryString = 'location' + req.body.location + '&categories=bars',
                url = 'https://api.yelp.com/v3/businesses/search',
                config = {
                    params: params,
                    headers: {'Authorization': 'Bearer ' + result.accessToken}
                };

            console.log('Search url = ', url);

            axios.get(url, config)
            .then(function (resp) {
                console.log('Yelp search response.data returns ', resp.data.businesses.length, ' businesses');

                res.json(resp.data);
            })
            .catch(function (error) {
                console.error('Yelp search error: ', error);

                res.json(error);
            })
        });
    };
}

module.exports = BarHandler;
