angular.module('annoncio').directive('listComments', function(){
	return {
		restrict: 'AEC', 
		scope: {
			comments:'='
		},
		replace:true,
		templateUrl: 'client/annonces/comments/list-comments.html',
		controllerAs: 'listComments',
		// link: function(scope, element, attributes){			
		// 	// scope.comments = comments;
		// },
		controller: function($scope, $reactive){
			$reactive(this).attach($scope);

			//$scope.$apply();
			this.subscribe('comments');
			this.helpers({
				comments: () => {
					return $scope.comments;
				}
			})
			// this.helpers({
			// 	comments: () => {
			// 		let wrapComments= [];
			// 		_.filter($scope.comments), (commentId) => {
			// 			let comment = Comments.findOne(commentId);
			// 			let owner = Meteor.users.findOne(comment.owner);
			// 			wrapComments.push({comment, owner});						
			// 		});
			// 		return wrapComments;
			// 	}
			// });

			
		}
	}
});