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
      return Users.findOne({_id: this.userObjFromRouter._id}).name;
    },
      'val': function (){  
      var user = Users.findOne({_id:this.userObjFromRouter._id});
      var sensorArr = user.sensors;
      var sensorNameFromRouter = this.sensor_name;
      if(sensorArr){
        var arr = [];
        sensorArr.forEach(function(entry) {
          if(entry.sensor_name == sensorNameFromRouter) {
            if(entry.measurements){
              arr = entry.measurements
          }
        }
        });
      }
      return arr;
     },

      'timestamp': function (){ 
      var user = Users.findOne({_id:this.userObjFromRouter._id});
      var sensorArr = user.sensors;
      var sensorNameFromRouter = this.sensor_name;
      if(sensorArr){
        var arr = [];
        sensorArr.forEach(function(entry) {
          if(entry.sensor_name == sensorNameFromRouter) {
           if(entry.measurements){
             arr = entry.measurements
          }
          }
        });
      }
      return arr;
     },



    // 'value': function (){  
    //   var user = Users.findOne({_id:this.userObjFromRouter._id});
    //   var sensorArr = user.sensors;
    //   var sensorNameFromRouter = this.sensor_name;
    //   if(sensorArr){
    //     var arr = [];
    //     sensorArr.forEach(function(entry) {
    //       if(entry.sensor_name == sensorNameFromRouter) {
    //         if(entry.measurements){
    //           entry.measurements.forEach(function(entry1){
    //           arr.push(entry1.value);
    //         });
    //       }
    //     }
    //     });
    //   }
    //   return arr;
    //  },

   // 'timestamp': function (){ 
   //    var user = Users.findOne({_id:this.userObjFromRouter._id});
   //    var sensorArr = user.sensors;
   //    var sensorNameFromRouter = this.sensor_name;
   //    if(sensorArr){
   //      var arr = [];
   //      sensorArr.forEach(function(entry) {
   //        if(entry.sensor_name == sensorNameFromRouter) {
   //         if(entry.measurements){
   //          entry.measurements.forEach(function(entry1){
   //            arr.push(entry1.time);
   //            console.log(arr)
   //          });
   //        }
   //        }
   //      });
   //    }
   //    return arr;
   //   },

  });
    Template.list.helpers({
    'list_names':function(){
      return Users.find();
    },
  });

    Template.recent.helpers({
    'recent_list':function(){
      return Users.find({}, {sort: {'created_at':-1}, limit:5});
    },
  });


    Template.sen.helpers({
    'list_sen': function (){ 
      var user = Users.findOne({_id:this.userObjFromRouter._id});
      var sensorArr = user.sensors;
      // if(sensorArr){
      //   console.log("yes")
      //   var arr = [];
      //   sensorArr.forEach(function(entry) {
      //     arr.push(entry.sensor_name);
      //     });
      // }
      return sensorArr;
     },

  });

}
