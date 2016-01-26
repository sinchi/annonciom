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
			this.perPage = '5';
			this.page = "1";
			this.sort = {
				published: -1
			};
			this.newComment = {};
			this.isCollapsed = false;	
			this.showNotification = false;	
			this.comments = [];
			this.showComments = false;


		

			this.helpers({
				commentsObjects : () => {
					let wrapComments = [];
					_.filter(this.getReactively('comments'), (commentId) => {
						let comment = Comments.findOne(commentId);
						let owner = Meteor.users.findOne(comment.owner);
						wrapComments.push({comment, owner});
					});
					return wrapComments;
				},
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
				},
				isLoggedIn : () => {
					return Meteor.userId();
				},				
				notifications: () => {

					let wrapNotifications = [];
					let user = Meteor.users.findOne(Meteor.userId());
					if(user && user !== null){
							let notificationsIds =  user.notifications;
							_.filter(notificationsIds, (notificationId) => {
								let notification = Notifications.findOne({_id: notificationId});

								if(notification && notification !== null){
									let comment = Comments.findOne(notification.commentId);
									let annonce = Annonces.findOne(notification.annonceId);
									wrapNotifications.push({comment, annonce, notification});
								}
								
							});
						}						

					return wrapNotifications;
				},
				countNotifications: () => {
					let count = 0;
					let user = Meteor.users.findOne(Meteor.userId());
					if(user && user !== null){
							let notificationsIds =  user.notifications;
							_.filter(notificationsIds, (notificationId) => {
								let notification = Notifications.findOne({_id: notificationId, vu: false});

								if(notification && notification !== null){
									count ++;
								}
								
							});
							return count;
						}
				},
				users: () => {
					return Meteor.users.find({});
				},
				currentUser: () => {
					return Meteor.userId();
				}

			});

			

			// this.getLastNotificationCommentForCurrentUser = () => {		

			// 	return 

			// 		// let notification = Notifications.findOne(this.user().notifications[0]);
			// 		// let comment = this.getCommentById(notification.commentId);
			// 		// let owner = Meteor.users.findOne(comment.owner);
			// 		// return comment.comment;				
			// };

			

			this.getImage = (image_id) => {
				return Images.findOne({_id: image_id});
			};
			
			this.subscribe('notifications');
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
				if(this.isLoggedIn){
						$modal.open({
						template: '<add-annonce-modal></add-annonce-modal>',
						animation: true
					});
				}else{
					console.log("you should be logged in");
				}
				
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

			this.getUserById = (userId) => {
				return Meteor.users.findOne({_id: userId});
			};



			this.addComment = (annonceId) => {
				if(this.isLoggedIn){
					var comment = angular.element("#"+annonceId).val();
					angular.element("#"+annonceId).val("");
					
					this.newComment.owner = Meteor.user()._id;
					this.newComment.published = new Date();	
					this.newComment.comment = comment;	
					
					Meteor.call('addComment', this.newComment, annonceId);
				}else{
					console.log('tu dois être authentifier pour faire un commentaire !');
				}
				
			};

			this.getCommentById = (commentId) => {
				return Comments.findOne({_id: commentId});
			};	

			this.vu = (notificationId) => {
				Meteor.call('vu', notificationId);
			};

			this.comment = (commentId) => {
				let wrapComment = {};
				let comment = this.getCommentById(commentId);
				let owner = this.getUserById(comment.owner);
				wrapComment.comment = comment;
				wrapComment.owner = owner;

				return wrapComment;
			}
 			
		}
	}
});