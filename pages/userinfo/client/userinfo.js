Template.showpet.helpers({
  petlist() {return Pet.find()},
})

Template.addpet.events({
  'click button'(elt,instance) {
    const name = instance.$('#name').val();
    const year = instance.$('#birthyear').val();
    const gender = instance.$('#gender').val();
    const ownername = instance.$('#ownername').val();
    const birthyear = parseInt(year);
    console.log('adding '+name);
    instance.$('#name').val("");
    instance.$('#birthyear').val("");
    instance.$('#gender').val("");
    instance.$('#ownername').val("");
    Pet.insert({name:name,birthyear:birthyear,gender:gender,ownername:ownername,
                owner:Meteor.userId(),
                creatAt:new Date()});
    //People.insert({name.birthyear})
  }
})
Template.petrow.helpers({
  isOwner(){console.dir(this);
    return this.pet.owner == Metor.userid()}
})
Template.petrow.events({
  'click span'(elt,instance) {
    console.dir(this);
    console.log(this.pet._id);
    if (this.pet.owner==Meteor.userId()){
       Pet.remove(this.pet._id);
    }else{
      alert("Why are you deleting someone else's entry?");
    }
  }
})
