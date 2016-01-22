angular.module('annoncio').directive('annoncesList',function(){
	return {
		restrict: 'E',
		templateUrl: 'client/annonces/annonces-list/annonces-list.html',
		controllerAs: 'annoncesList',
		controller: function($scope, $reactive){

			$reactive(this).attach($scope);
			this.category = '';

			this.helpers({
				annonces: () => {
					return Annonces.find( {'parent': this.getReactively('categorie') || ''});
				},
				categories: () => {
					return Categories.find({'parent': 'Informatique Et Multimedia'});
				}
			});

			this.addCategorieToSearch = (name) => {
				console.log("name to search is " + name);
			};

			this.getParentOfCategory = (cat) => {				
				return Categories.findOne({name: cat});
			};

			this.popoverit = () => {
				$('#pop').popover();
			};




		}
	}
});