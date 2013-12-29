/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;

function to_lower(v) {
    return v.toLowerCase();
}

function to_upper(v) {
    return v.toUpperCase();
}

function utcTime(t) {
    console.log('utcTime');
    var justUTC = t.toISOString().split('.');
    return '' + justUTC[0];
}

/**
 * Call Schema
 */
var CallSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
        get: utcTime
    },
    call: {
        type: String,
        default: '',
        trim: true,
        set: to_lower,
        get: to_upper
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    state: {
        type: String,
        default: '',
        trim: true,
        set: to_upper
    },
    country: {
        type: String,
        default: '',
        trim: true
    },
    rig: {
        type: String,
        default: '',
        trim: true
    },
    antenna: {
        type: String,
        default: '',
        trim: true
    },
    groups: {
        type: String,
        default: '',
        trim: true
    },
    notes: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
CallSchema.path('call').validate(function(call) {
    return call.length;
}, 'Call cannot be blank');

/**
 * Statics
 */
CallSchema.statics = {
    load: function(id, cb) {
        console.log('load');
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

/**
 * behaviors
 */
CallSchema.set('toJSON', { getters: true, virtuals: true});

/**
 * Virtual elements
 */
 CallSchema.virtual('utcYear').get(function() {
    var d = new Date(this.created);
    return d.getUTCFullYear();
 });

mongoose.model('Call', CallSchema);
