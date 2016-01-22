Meteor.startup(function(){
	if(Categories.find().count() === 0 && Annonces.find().count() > 0){
		var categories = [
			{				
				_id: 'Telephone'
			},
			{
				_id: 'Electronique'
			},
			{
				_id: 'PC Portable'
			},
			{
				_id: 'PC Bureaux'
			},
			{
				_id: 'Tablette'
			}

		];

		for(var i=0; i<categories.length; i++){
			Categories.insert(categories[i]);
		}
	}
});