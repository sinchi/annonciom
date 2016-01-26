Notifications = new Mongo.Collection('notifications');

Meteor.methods({
	vu : function(notificationId){		
		Notifications.update(notificationId, {$set: {vu: true}});
	},

	generateNotification : function(categoryName, annonceId){
		let category = Categories.findOne({name: categoryName});						
		let abonnes = category.abonnes;							
		_.filter(abonnes, (userId) => {
			let notification = {};
			notification.annonceId = annonceId;
			notification.vu = false;
			notification.published = new Date();
			Notifications.insert(notification, (err, notificationId) => {
				Meteor.users.update({_id: userId}, {
					$push: {notifications_category: notificationId}
				});				
			});
		});
	}
});