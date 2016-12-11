Router.map(function() {
    this.route('list', {
        path: '/',
    });

    this.route('users', {
        path: '/senList/:_id/:sensor_name',
        data: function() {
            return {
                userObjFromRouter: Users.findOne({
                    _id: this.params._id
                }),
                sensor_name: this.params.sensor_name
            };
        }
    });

    this.route('sen', {
        path: '/senList/:_id/',
        data: function() {
            return {
                userObjFromRouter: Users.findOne({
                    _id: this.params._id
                }),
            };
        }
    });

    this.route('recent', {
        path: '/recent_users',
    });
});