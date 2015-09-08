medianApp.service('Friend', ['$resource', function($resource) {
  return $resource(
    "/friends"
  );
}]);