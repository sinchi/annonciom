angular.module('annoncio').config(function($urlRouterProvider, $stateProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$stateProvider.state('annonces', {
		url: '/annonces',
		template: '<annonces-list></annonces-list>'
	});

	$urlRouterProvider.otherwise('/annonces');
}).run(function($rootScope, $state){
	 
});