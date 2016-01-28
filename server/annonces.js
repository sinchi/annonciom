Meteor.publish('annonces', function(options, searchText, category, city){
	if(!searchText && searchText == null)
		searchText = "";

	let selector = {	
			name: {"$regex": ".*" + searchText || ".*" + "", '$options' : 'i'},
			parent: {"$regex": category || ".*" + ""},
			city: {"$regex":  city || ".*" + ""},
			$or:[

				{
					$and: [
						{ 'public' : true },
						{ 'public': {$exists: true} }
					]
				},
				{
					$and:[
						{ owner: this.userId },
						{ owner: {$exists: true} }
					]
				}
			]		
	};

	Counts.publish(this,'numberOfAnnonces', Annonces.find(selector), {noReady: true});
	return Annonces.find(selector, options);
});

Meteor.publish('categories', function(){
	return Categories.find({});
});

Meteor.publish('cities', function(){
	return Cities.find({});
});

Meteor.publish('comments', function(){
	return Comments.find({});
});