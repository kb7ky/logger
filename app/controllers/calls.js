/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Call = mongoose.model('Call'),
    _ = require('underscore');


/**
 * Find call by id
 */
exports.call = function(req, res, next, id) {
    Call.load(id, function(err, call) {
        if (err) return next(err);
        if (!Call) return next(new Error('Failed to load call ' + id));
        req.call = call;
        next();
    });
};

/**
 * Create a call
 */
exports.create = function(req, res) {
    var call = new Call(req.body);
    call.user = req.user;

    call.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                call: call
            });
        }
        else {
            res.jsonp(call);
        }
    });
};

/**
 * Update a call
 */
exports.update = function(req, res) {
    var call = req.call;

    call = _.extend(call, req.body);

    call.save(function(err) {
        res.jsonp(call);
    });
};

/**
 * Delete an call
 */
exports.destroy = function(req, res) {
    var call = req.call;

    call.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(call);
        }
    });
};

/**
 * Show an call
 */
exports.show = function(req, res) {
    console.log(req.call);
    res.jsonp(req.call);
};

/**
 * List of Calls
 */
exports.all = function(req, res) {
    Call.find().sort('-created').populate('user').exec(function(err, calls) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(calls);
        }
    });
};
