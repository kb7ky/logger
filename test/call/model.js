/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Call = mongoose.model('Call');

//Globals
var user;
var call;

//The tests
describe('<Unit Test>', function() {
    describe('Model Call:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                call = new Call({
                    call: 'Call',
                    name: 'Name',
                    city: 'City',
                    state: 'State',
                    country: 'Country',
                    rig: 'Rig',
                    antenna: 'Antenna',
                    groups: 'Groups',
                    notes: 'Notes',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return call.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when trying to save without a valid call', function(done) {
                call.call = '';

                return call.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            done();
        });
    });
});
