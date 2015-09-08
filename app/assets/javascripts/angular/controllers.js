medianApp.controller("TestController", ['$scope','$resource','Friend', '$timeout', function($scope, $resource, Friend, $timeout) {
  $scope.testing = "Tim";

  var getAllFriends = function() {
  		Friend.query(function(model){
  			$scope.friends = model;
  			$timeout(getAllFriends, 1000)
  		}) 
  }
  getAllFriends();


}]);