angular.module('annoncio').directive('abonnementCategoriesModal', function(){
	return {
		restrict : 'E',
		templateUrl: 'client/annonces/modal/abonnement.html',
		controllerAs: 'abonnementCategories',
		controller: function($scope, $reactive){
			$reactive(this).attach($scope);
			

			this.selectedCategories = {
				cats: Meteor.call('userCategories')
			};


			this.checkAll = () => {				
				console.log(this.getReactively('selectedCategories').cats);
			};

			this.helpers({
				categories: () => {
					return Categories.find({})
				}
			});


			this.validate = () => {
				Meteor.call('abonner', this.getReactively('selectedCategories').cats, Meteor.userId());
				$scope.$close();
			};

			this.cancel = () => {
				$scope.$close();
			};

		}
	}
});