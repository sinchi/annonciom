angular.module('annoncio').directive('listComments', function(){
	return {
		restrict: 'E',
		templateUrl: 'client/annonces/comments/comments-list.html',
		controllerAs: 'commentsList',

		controller: function($scope, $reactive){

			$reactive(this).attach($scope);

			this.newComment = {};

			this.subscribe('users');
			this.subscribe('comments');

			this.helpers({
				
			});

			



		}
	}
});