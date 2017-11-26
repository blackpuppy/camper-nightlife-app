'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var BarHandler = require(path + '/app/controllers/barHandler.server.js');

module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();
    var barHandler = new BarHandler();

    app.route('/')
        .get(function (req, res) {
            res.render('index');
        });

    app.route('/login')
        .get(function (req, res) {
            res.render('users/login');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.render('users/profile');
        });

    app.route('/api/:id')
        .get(isLoggedIn, function (req, res) {
            res.json(req.user.twitter);
        });

    app.route('/auth/twitter')
        .get(passport.authenticate('twitter'));

    app.route('/auth/twitter/callback')
        .get(passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.route('/api/:id/clicks')
        .get(isLoggedIn, clickHandler.getClicks)
        .post(isLoggedIn, clickHandler.addClick)
        .delete(isLoggedIn, clickHandler.resetClicks);

    app.route('/api/bars')
        .post(barHandler.search);

    app.route('/api/bars/:id/toggle')
        .post(isLoggedIn, barHandler.toggle);
};
