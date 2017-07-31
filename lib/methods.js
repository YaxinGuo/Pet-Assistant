Meteor.methods({
  'petname.insert': function(petname) {
    Pet.insert(petname);
  },

  'id.remove': function(id) {
    Pet.remove(id);
  },

  'userprofile.insert': function(userprofile) {
    User.insert(userprofile);
    console.log('inserted userprofile');
},

  'userprofile.update': function(id, edituserprofile) {
    console.log(edituserprofile);
    User.update({owner:id}, edituserprofile);
},

});
