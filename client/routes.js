angular.module('annoncio').config(function($urlRouterProvider, $stateProvider, $locationProvider){

	$locationProvider.html5Mode(true);

	$stateProvider.state('annonces', {
		url: '/annonces',
		template: '<annonces-list></annonces-list>',
		// resolve: {
		// 	currentUser: ($q) => {
		// 		if(Meteor.userId == null ){
		// 			return $q.reject('AUTH_REQUIRED');
		// 		}else{
		// 			return $q.resolve();
		// 		}
		// 	}
		// }
	});

	$urlRouterProvider.otherwise('/annonces');
}).run(function($rootScope, $state){
	 $rootScope.$on('stateChange', function(event, fromState, fromParams, toState,  toParams, error){
	 	if(error === "AUTH_REQUIRED")
	 		$state.go("login");
	 })
});