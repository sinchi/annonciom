Categories = new Mongo.Collection('categories');

Meteor.methods({

	abonner: function(categoriesIds, userId){
		_.filter(categoriesIds, (categoryId) => {			
			Categories.update(categoryId, {$addToSet:{abonnes: userId}})
		});
	},

	userCategories: function(){
		let cats = [];
		let allCategories = Categories.find();
		_.filter(allCategories, (cat) => {
			if(cat && cat!==null){
				if(_.contains(cat.abonnes, this.userId)){
					cats.push(cat._id);
				}
			}
		});
		cats = ['Svo69kXqnG3tSsBvH'];
		return cats;
	}


})