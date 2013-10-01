angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Contacts",
        "link": "contacts"
    }, {
        "title": "Enter Contact",
        "link": "contacts/create"
    }, {
        "title": "Calls",
        "link": "calls"
    }, {
        "title": "Enter New Call",
        "link": "calls/create"
    }];
}]);
