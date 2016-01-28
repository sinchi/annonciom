Comments = new Mongo.Collection('comments');

Comments.allow({

	insert: function(userId, comment){
		return userId && comment.owner === userId;
	},

	update: function(userId, comment, fields, modifier){
		return userId && comment.owner === userId;
	},

	remove: function(userId, comment){
		return userId && comment.owner === userId;
	}
});

Meteor.methods({

	addComment: function(comment, annonceId){

		if(!this.userId)
			throw new Meteor.Error(403, 'Tu dois être connecté pour faire un commentaire');

		// 

		Comments.insert(comment, (err, commentId) => {
			let comments = Comments.find({annonceId: annonceId});
			let comment = Comments.findOne(commentId);
			let annonce = Annonces.findOne(annonceId);
			if(comments.length <= 1 && comment.owner == annonce.owner){

			}else{
				let notification = {};

				notification.annonce = annonce;
				notification.comment = comment;	
				notification.published = new Date();
				notification.vu = false;

				Notifications.insert(notification, (notificationId) => {
					_.filter(comments, (comment) => {
						if(comment && comment !== null){
							let userId = comment.owner;
							if(userId && userId !== annonce.owner){
								console.log('not equal owner');
									Meteor.users.update(userId, {
									$addToSet: {notifications: notificationId}
								});
							}		
						}
							

					});
				});
			}

			

			// Générer une notifiacation pour chaque ajout d'un commentaire

			

			// Notifications.insert(notification, (err, notificationId) => {
			

			// console.log(comments.maps);
				
			// 		// vérifier si l'id de créateur de l'annonce 
			// 			// est figuré dans la listes des users qui sont commentés sur l'annonce
			// 			let exists = false;						
			// 			_.filter(comments, (comment) => {
							
			// 				if(comment && comment !== null){
			// 					console.log("comment is : " +comment);
			// 					let userId = comment.owner;
			// 					if(userId && userId !== null && userId === annonce.owner){
			// 						console.log("oui exists");
			// 						exists = true;
			// 						return;
			// 					}
			// 				}
								

			// 			});

			// 			// s'il n'existe pas alors ajoute le manuellement avec cette methode
			// 			// exemple s'il a pas encore commenté sur l'annonce qui l'a créer lui même

			// 			if(!exists){
			// 				console.log("non n'exists pas");
			// 				Meteor.users.update(annonce.owner, {
			// 					$addToSet: {notifications: notificationId}
			// 				});
			// 			}

			// 			// Et continuer le traitement des autres users 
			// 			// qui figurent leurs ids déja dans la liste des commentaires 

				
			// 		_.filter(comments, (comment) => {
			// 			if(comment && comment !== null){
			// 				let userId = comment.owner;
			// 				if(userId && userId !== annonce.owner){
			// 					console.log('not equal owner');
			// 						Meteor.users.update(userId, {
			// 						$addToSet: {notifications: notificationId}
			// 					});
			// 				}		
			// 			}
							

			// 		});
				

						
									
			// });				
		});	
	}

});
