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

let getCommentOwner = function(commentId){
	return Comments.findOne(commentId).owner;
}

Meteor.methods({

	addComment: function(comment, annonceId){

		if(!this.userId)
			throw new Meteor.Error(403, 'Tu dois être connecté pour faire un commentaire');

		// 

		Comments.insert(comment, (err, commentId) => {

			// Ajouter l'id du commentaire retourné (commentId) dans le tableau comments
			// de l'annonce 

			Annonces.update(annonceId , {
				$addToSet: { comments : commentId }
			});

			// Générer une notifiacation pour chaque ajout d'un commentaire

			let notification = {};

			notification.annonceId = annonceId;
			notification.commentId = commentId;	
			notification.vu = false;

			let annonce = Annonces.findOne(annonceId);			

			Notifications.insert(notification, (err, notificationId) => {	

						// vérifier si l'id de créateur de l'annonce 
						// est figuré dans la listes des users qui sont commentés sur l'annonce
						let exists = false;						
						_.filter(annonce.comments, (commentId) => {
							let userId = getCommentOwner(commentId);
							if(userId === annonce.owner){
								exists = true;
								return;
							}								
						});

						// s'il n'existe pas alors ajoute le manuellement avec cette methode
						// exemple s'il a pas encore commenté sur l'annonce qui l'a créer lui même

						if(!exists){
							Meteor.users.update(annonce.owner, {
								$addToSet: {notifications: notificationId}
							});
						}

						// Et continuer le traitement des autres users 
						// qui figurent leurs ids déja dans la liste des commentaires 

				
					_.filter(annonce.comments, (commentId) => {
						let userId = getCommentOwner(commentId);
						if(userId && userId !== this.userId){
								Meteor.users.update(userId, {
								$addToSet: {notifications: notificationId}
							});
						}					
					});
									
			});				
		});	
	}

});
