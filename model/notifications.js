Notifications = new Mongo.Collection('notifications');

Meteor.methods({
	vu : function(notificationId){		
		Notifications.update(notificationId, {$set: {vu: true}});
	}
});