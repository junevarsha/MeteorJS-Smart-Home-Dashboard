Router.map(function () {
  this.route('about'); 
  this.route('home', {
    path: '/',  
  });

  this.route('users', {
    path: '/userList/:_id/:sensor_name',
    data: function(){
      return {
            userObjFromRouter: Users.findOne({_id: this.params._id}),
            sensor_name: this.params.sensor_name
          };
        }
      });



  this.route('sen', {
    path: '/senList/:_id/',
     data: function(){
      return {
            userObjFromRouter: Users.findOne({_id: this.params._id}),
          };
        }
  });

  this.route('list', {
    path: '/userList',
  });

  this.route('recent', {
    path: '/recent_users',
  });

  this.route('tech', {
    path: '/tech_used',
  });

});