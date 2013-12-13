/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Call Schema
 */
var CallSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    call: {
        type: String,
        default: '',
        trim: true
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
        trim: true
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
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Call', CallSchema);
