Meteor.startup(function(){
		if(Annonces.find().count() === 0){
		var annonces = [
			{
				'parent': 'Telephone',
				'ancestors': ['Electronique', 'Telephone'],
				'name': 'Galaxy s3',
				'description': 'ba9i new jdid'
			},
			{
				'parent': 'Tablette',
				'ancestors': ['Electronique', 'Tablette'],
				'name': 'ipad',
				'description': 'emporter depuis Espagne'
			}

		];

		for(var i=0; i<annonces.length; i++){
			Annonces.insert(annonces[i]);
		}
	}
});