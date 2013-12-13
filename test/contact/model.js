/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Contact = mongoose.model('Contact');

//Globals
var user;
var contact;

//The tests
describe('<Unit Test>', function() {
    describe('Model Contact:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                contact = new Contact({
                    call: 'Call',
                    mode: 'Mode',
                    power: 'Power',
                    antenna: 'Antenna',
                    utcTimeStart: new Date('04/30/1957 12:00:00 UTC'),
                    utcTimeEnd: new Date('04/30/1957 13:00:00 UTC'),
                    sentRST: 'RST sent',
                    recvRST: 'RST received',
                    notes: 'Notes',
                    sentQSL: 'sent QSL',
                    recvQSL: 'received QSL',
                    user: user
                });

                done();
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return contact.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without call', function(done) {
                contact.call = '';

                return contact.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without utcTimeStart', function(done) {
                contact.utcTimeStart = '';

                return contact.save(function(err) {
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
