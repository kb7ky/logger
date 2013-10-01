//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/contacts', {
            templateUrl: 'views/contacts/list.html'
        }).
        when('/contacts/create', {
            templateUrl: 'views/contacts/create.html'
        }).
        when('/contacts/:contactId/edit', {
            templateUrl: 'views/contacts/edit.html'
        }).
        when('/contacts/:contactId', {
            templateUrl: 'views/contacts/view.html'
        }).
        when('/calls', {
            templateUrl: 'views/calls/list.html'
        }).
        when('/calls/create', {
            templateUrl: 'views/calls/create.html'
        }).
        when('/calls/:callId/edit', {
            templateUrl: 'views/calls/edit.html'
        }).
        when('/calls/:callId', {
            templateUrl: 'views/calls/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
