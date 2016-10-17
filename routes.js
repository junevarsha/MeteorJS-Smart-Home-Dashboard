Router.map(function () {
  this.route('about'); 
  this.route('home', {
    path: '/',  
  });
  this.route('users', {
    path: '/user/:_id',
    data: function () {return Users.findOne({_id: this.params._id})},
  });
  this.route('list', {
    path: '/list',
  });

  this.route('recent', {
    path: '/recent_users',
  });

  this.route('tech', {
    path: '/tech_used',
  });

});