var medianApp = angular.module("projectMedian", ['ngRoute']);


medianApp.config(['$httpProvider', '$interpolateProvider', function($httpProvider, $interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
  $httpProvider.defaults.headers.common['X-CSRF-Token'] =
    $('meta[name=csrf-token]').attr('content');
}]);
