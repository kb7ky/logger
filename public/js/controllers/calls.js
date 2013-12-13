angular.module('mean.calls').controller('CallsController', ['$scope', '$routeParams', '$location', 'Global', 'Calls', function ($scope, $routeParams, $location, Global, Calls) {
    $scope.global = Global;

    $scope.create = function() {
        var call = new Calls({
                    call: this.call,
                    name: this.name,
                    city: this.city,
                    state: this.state,
                    country: this.country,
                    rig: this.rig,
                    antenna: this.antenna,
                    groups: this.groups,
                    notes: this.notes
        });
        call.$save(function(response) {
            $location.path("calls/" + response._id);
        });

        this.call = "";
        this.name = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.rig = "";
        this.antenna = "";
        this.groups = "";
        this.notes = "";
    };

    $scope.remove = function(call) {
        call.$remove();

        for (var i in $scope.calls) {
            if ($scope.calls[i] == call) {
                $scope.calls.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var call = $scope.call;
        if (!call.updated) {
            call.updated = [];
        }
        call.updated.push(new Date().getTime());

        call.$update(function() {
            $location.path('calls/' + call._id);
        });
    };

    $scope.find = function(query) {
        Calls.query(query, function(calls) {
            $scope.calls = calls;
        });
    };

    $scope.findOne = function() {
        Calls.get({
            callId: $routeParams.callId
        }, function(call) {
            $scope.call = call;
        });
    };
}]);