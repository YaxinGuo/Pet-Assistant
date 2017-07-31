Template.userprofile.onCreated(function(){
  Meteor.subscribe('user');
});

Template.userprofile.helpers({
  "hasProfile": function(){
    if(!Template.instance().data && Template.instance().data.owner !== Meteor.userId()){
      window.alert("No such profile");
      Router.go("/");
      return;
    }
    return Template.instance().data;
  },
  "makeProfile": function(){
    //check if the current profile belongs to the current user
    if(!Template.instance().data) return true;
    if(Template.instance().data.owner === Meteor.userId()){
      return !User.findOne()? true : false;
    } else {
      return false;
    }
  },
})

Template.showprofile.helpers({
  "user": function(){
    return User.findOne();
  },
})

Template.showprofile.events({
  "change #editpic": function(event){
    if($("#editpic").val()){
      if(event.currentTarget.files&&event.currentTarget.files[0] && event.currentTarget.files[0].type.match(/(jpg|jpeg|png|gif)$/)) {
        if(event.currentTarget.files[0].size>1048576) {
          alert('File size is larger than 1MB!');
        }else{
          var reader = new FileReader();
          reader.onload = function(event){
            var result = event.currentTarget.result;
            $('#editpic1').attr('src', result);
            $('#editpic1').css('display', 'block');
          };
          //read the image file as a data URL
          reader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{
         alert('This is not an image file!');
      }
    }else{
      $("#editpic1").attr("src","");
      $("#editpic1").css("display","none");
    }
  },

  'click button#edit'(elt,instance) {
    instance.$(".showprofilediv").css("display", "none");
    instance.$(".editinfo").css("display", "block");
  },

  'click button#save'(elt,instance) {
    $("#save").attr("class", "ui right floated blue loading disabled button");
    console.log("clicked");
    const editfirstname = instance.$('.editfirstname').val()+" ";
    const editlastname = instance.$('.editlastname').val();
    const editfullname = instance.$('.editfirstname').val()+" "+instance.$('.editlastname').val();
    const editemail = instance.$('.editemail').val();
    const editphone = instance.$('.editphone').val();
    const editdateofbirth = instance.$('.editdateofbirth').val();
    const editgender = instance.$('.editgender').val();
    const editlocation = instance.$('.editlocation').val();
    const editcolor = instance.$('.editcolor').val();
    const editbio = instance.$('.editbio').val();
    const editpic=instance.$('#editpic')[0].files[0];
    const editagree = $(".editagree").is(":checked");

  //usernameinputs = instance,$("#")
  //console.log('adding '+name);

    var userprofile = {firstname:editfirstname,
                 lastname:editlastname,
                 fullname:editfullname,
                 email:editemail,
                 phone:editphone,
                 dateofbirth:editdateofbirth,
                 gender:editgender,
                 location:editlocation,
                 color:editcolor,
                 bio:editbio,
                 owner:Meteor.userId()};
     console.log(userprofile);
     if (editagree) {
       var image_base64;
       //client-side validation
       if($("#editpic").val()){
         if($("#editpic")[0].files&&($("#editpic")[0].files[0]) && ($("#editpic")[0].files[0].type).match(/(jpg|jpeg|png|gif)$/)) {
           if(($("#editpic")[0].files[0].size)>1048576) {
             alert('File size is larger than 1MB!');
           } else {
             //get the image file and convert it to base64 form
             var image_file = $("#editpic")[0].files[0];
             var imgToBase64 = function(image_file, callback) {
               var reader = new FileReader();
               reader.onload = function() {
                 var dataUrl = reader.result;
                 img_base64 = dataUrl.split(',')[1];
                 callback(img_base64);
               };
               reader.readAsDataURL(editpic);
             };

             //send the data to the sever
             imgToBase64(image_file, function(image_base64){
               userprofile.pic = img_base64;
               Meteor.call('userprofile.update',Meteor.userId(), userprofile, function(err, result){
                 if(err){
                   alert(err.message);
                   $("#save").attr("class","ui right floated blue botton");
                   return;
                 }
                 instance.$(".editinfo").css("display", "none");
                 instance.$(".showprofilediv").css("display", "block");
               });
             });
           }
          }else{
           $("#editpic1").attr("src","");
           $("#editpic1").css("display","none");
           alert('This is not an image file!');
           $("#save").attr("class", "ui right floated blue button");
         }
       }else{
         Meteor.call('userprofile.update', Meteor.userId(), userprofile, function(err, result){
                if(err){
                  alert(err.message);
                  $("#submit").attr("class","ui right floated blue button");
                  return;
                }
                instance.$(".editinfo").css("display", "none");
                instance.$(".showprofilediv").css("display", "block");
          });
       }
     }else{
           alert('You must check the box to insert your profile');
     }
   },
})

Template.addprofile.events({

  "change #pic": function(event){
    if($("#pic").val()){
      if(event.currentTarget.files&&event.currentTarget.files[0] && event.currentTarget.files[0].type.match(/(jpg|jpeg|png|gif)$/)) {
        if(event.currentTarget.files[0].size>1048576) {
          alert('File size is larger than 1MB!');
        }else{
          var reader = new FileReader();
          reader.onload = function(event){
            var result = event.currentTarget.result;
            $('#pic1').attr('src', result);
            $('#pic1').css('display', 'block');
          };
          //read the image file as a data URL
          reader.readAsDataURL(event.currentTarget.files[0]);
        }
      }else{
         alert('This is not an image file!');
      }
    }else{
      $("#pic1").attr("src","");
      $("#pic1").css("display","none");
    }
  },


  'click button#submit'(elt,instance) {
    //set loading status of the botton
    $("#submit").attr("class", "ui right floated blue loading disabled button");

    const firstname = instance.$('#firstname').val();
    const lastname = instance.$('#lastname').val();
    const fullname = instance.$('#firstname').val()+" "+instance.$('#lastname').val();
    const email = instance.$('#email').val();
    const phone = instance.$('#phone').val();
    const dateofbirth = instance.$('#dateofbirth').val();
    const gender = instance.$('#gender').val();
    const location = instance.$('#location').val();
    const color = instance.$('#color').val();
    const bio = instance.$('#bio').val();
    const pic=instance.$('#pic')[0].files[0];
    const agree = $("#agree").is(":checked");

    //usernameinputs = instance,$("#")
    //console.log('adding '+name);

    users = User.find({owner:Meteor.userId()}).fetch();


    var userprofile = {firstname:firstname,
                   lastname:lastname,
                   fullname:fullname,
                   email:email,
                   phone:phone,
                   dateofbirth:dateofbirth,
                   gender:gender,
                   location:location,
                   color:color,
                   bio:bio,
                   owner:Meteor.userId()};

    if (agree) {
      var image_base64;
      //client-side validation
      if($("#pic").val()){
        if($("#pic")[0].files&&($("#pic")[0].files[0]) && ($("#pic")[0].files[0].type).match(/(jpg|jpeg|png|gif)$/)) {
          if(($("#pic")[0].files[0].size)>1048576) {
            alert('File size is larger than 1MB!');
          } else {
            //get the image file and convert it to base64 form
            var image_file = $("#pic")[0].files[0];
            var imgToBase64 = function(image_file, callback) {
              var reader = new FileReader();
              reader.onload = function() {
                var dataUrl = reader.result;
                img_base64 = dataUrl.split(',')[1];
                callback(img_base64);
              };
              reader.readAsDataURL(pic);
            };

            //send the data to the sever
            imgToBase64(image_file, function(image_base64){
              userprofile.pic = img_base64;
              Meteor.call('userprofile.insert',userprofile, function(err, result){
                if(err){
                  alert(err.message);
                  $("#submit").attr("class","ui right floated blue botton");
                  return;
                }
                instance.$(".addprofilediv").css("display", "none");
                instance.$(".showprofilediv").css("display", "block");
              });
            });
          }
         }else{
          $("#pic1").attr("src","");
          $("#pic1").css("display","none");
          alert('This is not an image file!');
          $("#submit").attr("class", "ui right floated blue button");
        }
      }else{
        // userprofile.pic = ;
        Meteor.call('userprofile.insert',userprofile, function(err, result){
                if(err){
                  alert(err.message);
                  $("#submit").attr("class","ui right floated blue botton");
                  return;
                }
                instance.$(".addprofilediv").css("display", "none");
                instance.$(".showprofilediv").css("display", "block");
         });
      }
    }else{
          alert('You must check the box to insert your profile');
    }
  },
})
