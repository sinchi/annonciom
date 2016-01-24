angular.module('annoncio').directive('addAnnonceModal', function(){
	return {
		restrict: 'E',
		templateUrl: "client/annonces/modal/add-annonces.html",
		controllerAs: 'addModalAnnonce',
		controller: function($scope, $stateParams, $reactive, $modal, $rootScope){

			$reactive(this).attach($scope);

			// $scope.$on('modal.closing', (event, reason , closed) => {
			// 	if(this.newAnnonce.images && this.newAnnonce.images.length > 0){
			// 		for(var i=0; i<this.newAnnonce.images.length; i++){
			// 			Images.remove({_id: this.newAnnonce.images[i]});
			// 		}
			// 	}
			// });

			this.newAnnonce = {};
			this.category = "";
			this.city = "";							

			this.helpers({
				categories: () => {
					return Categories.find({});
				},
				cities: () => {
					return Cities.find({});
				}
			});

			this.addAnnonce = () => {
				Annonces.insert(this.newAnnonce);
				this.newAnnonce = {};
			};

			this.ok = () => {				
				var ancestor = this.getParentOfCategory(this.getReactively('category')).parent;				
				this.newAnnonce.ancestors = [ancestor, this.getReactively('category')];
				this.newAnnonce.city = this.getReactively('city');
				this.newAnnonce.parent = this.getReactively('category');
				this.newAnnonce.published = new Date();				
				this.newAnnonce.owner = Meteor.userId();
				this.newAnnonce.public = true;

				Annonces.insert(this.newAnnonce, (err, annonce)  => {
					if(!err)
						console.log('added with success');
					else
						console.log(err);
				});
				console.log(this.newAnnonce);
				$scope.$close();
			};

			this.cancel = () => {	
				if(this.newAnnonce.images && this.newAnnonce.images.length > 0){
					for(var i=0; i<this.newAnnonce.images.length; i++){
						Images.remove({_id: this.newAnnonce.images[i]});
					}
				}			
				$scope.$close();
			};

			this.getParentOfCategory = (cat) => {				
				return Categories.findOne({name: cat});
			};			

			this.addImages = (files) => {
				if(files && files.length > 0){
					Images.insert(files[0], (err, image) => {
						
							if(!this.newAnnonce.images){
								this.newAnnonce.images = [];							
							}
							this.newAnnonce.images.push(image._id);
						
					});
				}
			};

			this.getImage =  (image_id) => {
				return Images.findOne({_id: image_id});
			};
		}
	}
});