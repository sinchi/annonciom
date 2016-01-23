angular.module('annoncio').directive('annoncesList',function(){
	return {
		restrict: 'E',
		templateUrl: 'client/annonces/annonces-list/annonces-list.html',
		controllerAs: 'annoncesList',
		controller: function($scope, $reactive, $modal){

			$reactive(this).attach($scope);
			this.category = '';
			this.city = '';	
			this.searchText = "";
			this.perPage = '3';
			this.page = "1";
		

			this.helpers({
				annonces: () => {

					return Annonces.find({}, {sort: {published: -1}});					
				},
				categories: () => {
					return Categories.find({'parent': 'Informatique Et Multimedia'} || '');
				},
				cities: () => {
					return Cities.find({});
				}
			});
			
			this.subscribe('categories');
			this.subscribe('cities');
			this.subscribe('annonces', () => {
				return [
					{
						limit: parseInt(this.perPage),
						skip: parseInt(this.getReactively('page') - 1) * this.perPage						
					},
					this.getReactively('searchText'),
					this.getReactively('category'),
					this.getReactively('city')

				]
			});

			this.openModal = () => {
				if(Meteor.userId()){
						$modal.open({
						template: '<add-annonce-modal></add-annonce-modal>',
						animation: true
					});
					}else{
						console.log("you should be logged in");
					}
				
			};
			

			this.addCategorieToSearch = (name) => {
				console.log("name to search is " + name);
			};

			this.getParentOfCategory = (cat) => {				
				return Categories.findOne({name: cat});
			};

			this.popoverit = () => {
				$('#pop').popover();
			};

			this.countAnnonces = () => {
				return Counts.get('numberOfAnnonces');
			};

			this.changePage = (newPageNumber) => {
				this.page = newPageNumber;
				console.log("new page : "+ newPageNumber);
			};



		}
	}
});