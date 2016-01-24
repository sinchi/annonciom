Annonces = new Mongo.Collection('annonces');

Annonces.allow({

	insert: function(userId, annonce){
		return userId && annonce.owner === userId;
	},

	update: function(userId, annonce, fields, modifier){
		return userId && annonce.owner === userId; 
	},

	remove: function(userId , annonce){
		return userId && annonce.owner === userId;
	}

});

// var Schemas = {};

// Schemas.Annonce = new SimpleSchema({
// 	comments:{
// 		type: [String]
// 	}
// });

// Annonces.attachSchema(Schemas.Annonce);



// Meteor.methods({
// 	addComment: function(annonceId, commentId){
// 		// check(annonceId, String);
// 		// check(commentId, String);
// 		Annonces.update(annonceId , {
// 			$addToSet: {comments : commentId }
// 		});

// 	}
// });