/* Cloud9 config */
/*****************/
/* globals Meteor angular Parties Mongo UiRouter */

Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
    angular.module('socially',['angular-meteor', 'ui.router']);
    angular.module("socially").config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){

        $locationProvider.html5Mode(true);
    
        $stateProvider
            .state('parties', {
                url: '/parties',
                template: UiRouter.template('parties-list.html'),
                controller: 'PartiesListCtrl'
            })
            .state('partyDetails', {
                url: '/parties/:partyId',
                template: UiRouter.template('party-details.html'),
                controller: 'PartyDetailsCtrl'
            });
    
            $urlRouterProvider.otherwise("/parties");
    }]);

    Meteor.startup(function () {
        angular.bootstrap(document, ['socially']);
    });
    
    angular.module("socially").controller("PartiesListCtrl", ['$scope', '$collection', function($scope, $collection){
        $collection(Parties).bind($scope, 'parties', true, true);
        
        $scope.remove = function(party){
            $scope.parties.splice( $scope.parties.indexOf(party), 1 );
        };
        
    }]);
    
    angular.module("socially").controller("PartyDetailsCtrl", ['$scope', '$stateParams', '$collection', function($scope, $stateParams, $collection){
        $scope.partyId = $stateParams.partyId;
        $collection(Parties).bindOne($scope, 'party', $stateParams.partyId, true, true);
    }]);
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (Parties.find().count() === 0) {
            var parties = [
                {
                    'name': 'Dubstep-Free Zone',
                    'description': 'Can we please just for an evening not listen to dubstep.'
                },
                {
                    'name': 'All dubstep all the time',
                    'description': 'Get it on!'
                },
                {
                    'name': 'Savage lounging',
                    'description': 'Leisure suit required. And only fiercest manners.'
                }
            ];
            
            for (var i = 0; i < parties.length; i++)
                Parties.insert({name: parties[i].name, description: parties[i].description});
        }
    });
}