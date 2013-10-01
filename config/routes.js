var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

    //Contacts Routes
    var contacts = require('../app/controllers/contacts');
    app.get('/contacts', contacts.all);
    app.post('/contacts', auth.requiresLogin, contacts.create);
    app.get('/contacts/:contactId', contacts.show);
    app.put('/contacts/:contactId', auth.requiresLogin, auth.contact.hasAuthorization, contacts.update);
    app.del('/contacts/:contactId', auth.requiresLogin, auth.contact.hasAuthorization, contacts.destroy);

    //Finish with setting up the articleId param
    app.param('contactId', contacts.contact);

    //Calls Routes
    var calls = require('../app/controllers/calls');
    app.get('/calls', calls.all);
    app.post('/calls', auth.requiresLogin, calls.create);
    app.get('/calls/:callId', calls.show);
    app.put('/calls/:callId', auth.requiresLogin, auth.call.hasAuthorization, calls.update);
    app.del('/calls/:callId', auth.requiresLogin, auth.call.hasAuthorization, calls.destroy);

    //Finish with setting up the articleId param
    app.param('callId', calls.call);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
