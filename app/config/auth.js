'use strict';

module.exports = {
    'twitterAuth': {
        'consumerKey': process.env.TWITTER_CONSUMER_KEY,
        'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
        'callbackURL': process.env.APP_URL + 'auth/twitter/callback'
    },
    'yelpAuth': {
        'clientID': process.env.YELP_CLIENT_ID,
        'clientSecret': process.env.YELP_CLIENT_SECRET,
    }
};
