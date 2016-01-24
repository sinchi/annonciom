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
			this.perPage = '10';
			this.page = "1";
			this.sort = {
				published: -1
			};
			this.newComment = {};
		

			this.helpers({
				annonces: () => {
					return Annonces.find({}, {sort: this.getReactively('sort') });					
				},
				categories: () => {
					return Categories.find({'parent': 'Informatique Et Multimedia'} || '');
				},
				cities: () => {
					return Cities.find({});
				},
				images: () => {
					return Images.find({});
				}
			});

			this.getImage = (image_id) => {
				return Images.findOne({_id: image_id});
			};
			this.subscribe('comments');
			this.subscribe('images');
			this.subscribe('categories');
			this.subscribe('cities');
			this.subscribe('users');
			this.subscribe('annonces', () => {
				return [
					{
						limit: parseInt(this.perPage),
						skip: parseInt(this.getReactively('page') - 1) * this.perPage,
						sort: this.getReactively('sort')				
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

			this.getAnnonceCreator = (userId) => {
				return Meteor.users.findOne({_id: userId});
			};

			this.addComment = (annonceId) => {
				var comment = angular.element("#"+annonceId).val();
				
				this.newComment.owner = Meteor.user()._id;
				this.newComment.published = new Date();	
				this.newComment.comment = comment;	
				this.newComment.annonce = annonceId;		
				Comments.insert(this.newComment, (err, rComment) => {	
					console.log("annonceID !!! " + annonceId);
					console.log("commentID !!! " + rComment._id);
					console.log("err !!! " + err);
					Annonces.update(annonceId , {
						$addToSet: { comments : rComment._id }
					});
				});			
			};


		}
	}
});