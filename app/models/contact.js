/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Contact Schema
 */
var ContactSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    utcdate: {
        type: Date,
        default: Date.now
    },
    call: {
        type: String,
        default: '',
        trim: true
    },
    mode: {
        type: String,
        default: 'A1',
        trim: true
    },
    power: {
        type: String,
        default: '100',
        trim: true
    },
    antenna: {
        type: String,
        default: 'Vert',
        trim: true
    },
    utcTimeStart: {
        type: Date,
        default: Date.now
    },
    utcTimeEnd: {
        type: Date,
        default: Date.now
    },
    sentRST: {
        type: String,
        default: '599',
        trim: true
    },
    recvRST: {
        type: String,
        default: '599',
        trim: true
    },
    notes: {
        type: String,
        default: '',
        trim: true
    },
    sentQSL: {
        type: String,
        default: '',
        trim: true
    },
    recvQSL: {
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
ContactSchema.path('call').validate(function(call) {
    return call.length;
}, 'Call cannot be blank');

ContactSchema.path('utcTimeStart').validate(function(start) {
    return ( (typeof start != 'undefined') && (start !== null) );
}, 'utcTimeStart cannot be blank');

/**
 * Statics
 */
ContactSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Contact', ContactSchema);
