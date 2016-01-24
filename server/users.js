Meteor.publish('users', function(){
	Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish('comments', function(){
	return Comments.find({});
});