angular.module('annoncio').directive('listComments', function(){
	return {
		restrict: 'AEC', 
		scope: {
			comments:'='
		},
		replace:true,
		templateUrl: 'client/annonces/comments/list-comments.html',
		controllerAs: 'listComments',
		link: function(scope, element, attributes){			
			//console.log(scope);
		},
		controller: function($scope, $reactive){
			$reactive(this).attach($scope);


			
			this.helpers({
				comments: () => {
					let wrapComments= [];
					_.filter($scope.comments, (commentId) => {
						let comment = Comments.findOne(commentId);
						let owner = Meteor.users.findOne(comment.owner);
						wrapComments.push({comment, owner});						
					});
					return wrapComments;
				}
			});

			
		}
	}
});