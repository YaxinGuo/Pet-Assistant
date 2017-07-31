Meteor.publish('pet', function(){
  return Pet.find();
})

Meteor.publish('user', function(){
  return User.find();
})
