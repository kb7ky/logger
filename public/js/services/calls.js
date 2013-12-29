//Articles service used for articles REST endpoint
angular.module('mean.calls').factory("Calls", ['$resource', function($resource) {
    return $resource('calls/:callId', {
        callId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);