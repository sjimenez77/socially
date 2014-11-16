/* globals angular Parties */
angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$collection', function($scope, $stateParams, $collection){
    $scope.partyId = $stateParams.partyId;
    $collection(Parties).bindOne($scope, 'party', $stateParams.partyId, true, true);
}]);
