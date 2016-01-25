Meteor.startup(function(){
	if(Categories.find().count() === 0 && Annonces.find().count() > 0){
		var categories = [
			{				
				name: 'Telephone'
			},
			{
				name: 'Electronique'
			},
			{
				name: 'PC Portable'
			},
			{
				name: 'PC Bureaux'
			},
			{
				name: 'Tablette'
			}

		];

		for(var i=0; i<categories.length; i++){
			Categories.insert(categories[i]);
		}
	}
});
