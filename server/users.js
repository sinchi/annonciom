Meteor.publish('users', function(){
	return Meteor.users.find({}, {fields: {emails: 1, profile: 1, notifications: 1 , _id: 1}});
});

Meteor.publish('comments', function(){
	return Comments.find({});
});