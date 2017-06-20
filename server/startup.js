Meteor.startup(function(){
	// code to run on server at startup
  Pet.remove({});  // clear the database
  Pet.insert({name:'Xiaoai',birthyear:2016,gender:'Female',ownername:'Selina'});
  Pet.insert({name:'Youzi',birthyear:2016,gender:'Male',ownername:'Yidi'});


	//if (Pokedex.find().count()==0){
	//	console.log("Importing Pokedex to db")

	//	 var data = JSON.parse(Assets.getText(
	//			 "Pokemon-DB-master/pokedex.json"));
	//		 console.log("data length = "+data.length);

	//		 data.forEach(function (item, index, array) {
				 //console.log(index+" "+JSON.stringify(item));
	//				 Pokedex.insert(item);
	//		 })
	//		 console.log("Pokedex imported");
	//};

// this is very insecure, but helpful for development
	Meteor.publish('userList', function (){
  return Meteor.users.find({});
});

});
