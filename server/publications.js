Meteor.publish('pet',function(){
  return Pet.find();
})
