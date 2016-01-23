Meteor.startup(function(){
	if(Cities.find().count() == 0){
		var cities = [
			{
				name: "casablanca"
			},
			{
				name: "fes"
			},
			{
				name: "marrakech"
			}
		];

		for(var i=0; i<cities.length; i++)
			Cities.insert(cities[i]);
	}
});