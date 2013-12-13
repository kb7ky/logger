angular.module('mean.contacts').controller('ContactsController', ['$scope', '$routeParams', '$location', 'Global', 'Contacts', function ($scope, $routeParams, $location, Global, contacts) {
    $scope.global = Global;

    $scope.create = function() {
        var contact = new Contacts({
            title: this.title,
            content: this.content
        });
        contact.$save(function(response) {
            $location.path("contacts/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(contact) {
        contact.$remove();

        for (var i in $scope.contacts) {
            if ($scope.contacts[i] == contact) {
                $scope.contacts.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var contact = $scope.contact;
        if (!contact.updated) {
            contact.updated = [];
        }
        contact.updated.push(new Date().getTime());

        contact.$update(function() {
            $location.path('contacts/' + contact._id);
        });
    };

    $scope.find = function(query) {
        contacts.query(query, function(contacts) {
            $scope.contacts = contacts;
        });
    };

    $scope.findOne = function() {
        contacts.get({
            contactId: $routeParams.contactId
        }, function(contact) {
            $scope.contact = contact;
        });
    };
}]);