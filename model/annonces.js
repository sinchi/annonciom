Annonces = new Mongo.Collection('annonces');

Annonces.allow({

	insert: function(userId, annonce){
		return userId && annonce.owner === userId;
	},

	update: function(userId, annonce, fields, modifier){
		return userId && annonces.owner === userId; 
	},

	remove: function(userId , annonce){
		return userId && annonces.owner === userId;
	}

});

