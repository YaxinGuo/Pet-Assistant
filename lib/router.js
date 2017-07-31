Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});

Router.route('userprofile', {
	path:'userprofile',
	template:'userprofile',
	waitOn: function(){
		return[Meteor.subscribe('user', this.params._id)];
	},
	data: function(){
		return User.findOne();
	}
});

Router.route('petlist');

Router.route('contactus');
Router.route('search');

// 	Router.route('chat');
// 	Router.route('about');
//
// Router.route('pokemon');
// Router.route('pokemonData/:_id',
// {name:"pokemonData",
//  data: function(){
// 	 const c = Pokedex.findOne(this.params._id);
// 	 return c;
//  }});
//
// Router.route('apidemo');
//
// Router.route('firefly');
//
// Router.route('sponsors')
//
// Router.route('draw')
//
// Router.route('graphics')
//
// Router.route('upload')
