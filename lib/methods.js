Meteor.methods({
  'petname.insert': function(petname) {
    Pet.insert(petname);
  },

  'petname.remove': function(petname) {
    Pet.remove(petname);
  },
});
