var database, numberOfDocs;
Users = new Meteor.Collection('users');


if (Meteor.isServer) {
  console.log("On server")
  database = new MongoInternals.RemoteCollectionDriver('mongodb://localhost:27017/newSensor');
  numberOfDocs = database.open('users').find().count()
  console.log(numberOfDocs)
  Meteor.publish('users', function () {
    return Users.find();
  });
}

if (Meteor.isClient) {

  //This code only runs on the client
  Meteor.subscribe('users', function(){
    console.log(Users.find().fetch());
  });

    Template.users.helpers({
    'testingTemp': function (){ 
      return Users.find().count();
    },
    'name': function (){ 
      return Users.findOne({_id: this._id}).name;
    },
    'value': function (){ 
      var user = Users.findOne({_id:this._id});
      var sensorArr = user.sensors;
      if(sensorArr){
        console.log("yes")
        var arr = [];
        sensorArr.forEach(function(entry) {
          if(entry.measurements){
            console.log("cool")
            entry.measurements.forEach(function(entry1){
              arr.push(entry1.value);
              console.log(arr)
            });
          }
        });
      }
      return arr;
     },


   'timestamp': function (){ 
      var user = Users.findOne({_id:this._id});
      var sensorArr = user.sensors;
      if(sensorArr){
        console.log("yes")
        var arr = [];
        sensorArr.forEach(function(entry) {
          if(entry.measurements){
            console.log("cool")
            entry.measurements.forEach(function(entry1){
              arr.push(entry1.time);
              console.log(arr)
            });
          }
        });
      }
      return arr;
     },

  });
    Template.list.helpers({
    'list_names':function(){
      return Users.find();
      // data = Users.find().fetch();
      // return data.name
      // var li = [];
      // data.forEach(function(entry) {
      // li.push(entry.name)
      // });
      // return li;
    },
  });

    Template.recent.helpers({
    'recent_list':function(){
      // return Users.find().reverse();
      return Users.find({}, {sort: {'created_at':-1}, limit:5});
      // return Answers.find().sort({$natural: -1});
      // return Users.find({}, {limit: 5});
    },
  });
}
