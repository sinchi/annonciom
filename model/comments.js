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

		Comments.insert(comment, (err, commentId) => {
			Annonces.update(annonceId , {
				$addToSet: { comments : commentId }
			});

			let notification = {};

			notification.annonceId = annonceId;
			notification.commentId = commentId;	
			notification.vu = false;

			let annonce = Annonces.findOne(annonceId);			

			Notifications.insert(notification, (err, notificationId) => {	

						let exists = false;						
						_.filter(annonce.comments, (commentId) => {
							let userId = getCommentOwner(commentId);
							if(userId === annonce.owner){
								exists = true;
								return;
							}								
						});

						if(!exists){
							Meteor.users.update(annonce.owner, {
								$addToSet: {notifications: notificationId}
							});
						}


				
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
