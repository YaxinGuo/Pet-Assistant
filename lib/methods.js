Meteor.methods({
  'petname.insert': function(petname) {
    Pet.insert(petname);
  },

  'id.remove': function(id) {
    Pet.remove(id);
  },

});
