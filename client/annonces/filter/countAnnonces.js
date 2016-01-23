angular.module('annoncio').filter('count', function(){
	return function(annonces, perPage){
		return (annonces.length > perPage);
	}
});