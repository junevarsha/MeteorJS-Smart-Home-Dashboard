var database, numberOfDocs;
Users = new Meteor.Collection('users');

if (Meteor.isServer) {
    database = new MongoInternals.RemoteCollectionDriver('mongodb://localhost:27017/newSensor');
    numberOfDocs = database.open('users').find().count()
    Meteor.publish('users', function() {
        return Users.find();
    });
}

if (Meteor.isClient) {

    //This code only runs on the client
    Meteor.subscribe('users', function() {
        console.log(Users.find().fetch());
    });

    Template.users.helpers({

        'name': function() {
            return Users.findOne({
                _id: this.userObjFromRouter._id
            }).name;
        },
        'id': function() {
            return Users.findOne({
                _id: this.userObjFromRouter._id
            })._id;
        },
        'sen': function() {
            return this.sensor_name;
        },

        'list_names': function() {
            return Users.find();
        },
        'testingTemp': function() {
            return Users.find().count();
        },

        'val': function() {
            var user = Users.findOne({
                _id: this.userObjFromRouter._id
            });
            var sensorArr = user.sensors;
            var sensorNameFromRouter = this.sensor_name;
            if (sensorArr) {
                var arr = [];
                sensorArr.forEach(function(entry) {
                    if (entry.sensor_name == sensorNameFromRouter) {
                        if (entry.measurements) {
                            arr = entry.measurements
                        }
                    }
                });
            }
            return arr;
        },

        'timestamp': function() {
            var user = Users.findOne({
                _id: this.userObjFromRouter._id
            });
            var sensorArr = user.sensors;
            var sensorNameFromRouter = this.sensor_name;
            if (sensorArr) {
                var arr = [];
                sensorArr.forEach(function(entry) {
                    if (entry.sensor_name == sensorNameFromRouter) {
                        if (entry.measurements) {
                            arr = entry.measurements
                        }
                    }
                });
            }
            return arr;
        },
    });

    Template.list.helpers({
        'list_names': function() {
            return Users.find();
        },
        'testingTemp': function() {
            return Users.find().count();
        },
        'id': function() {
            return Users.findOne({
                _id: this.userObjFromRouter._id
            })._id;
        },
    });

    Template.recent.helpers({
        'recent_list': function() {
            return Users.find({}, {
                sort: {
                    'created_at': -1
                },
                limit: 3
            });
        },
    });


    Template.sen.helpers({
        'list_sen': function() {
            var user = Users.findOne({
                _id: this.userObjFromRouter._id
            });
            var sensorArr = user.sensors;
            return sensorArr;
        },

        'name': function() {
            return Users.findOne({
                _id: this.userObjFromRouter._id
            }).name;
        },

    });

}