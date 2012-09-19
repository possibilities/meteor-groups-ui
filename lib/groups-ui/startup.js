Meteor.startup(function() {

  Meteor.users.find().forEach(function(user) {
    Session.set('acceptClass-' + user._id, '');
  });

  new MeteorEnv({
    hosts: ['groups-ui.meteor.com']
  });

  if (Meteor.env.is_production) {
    var userId = '19579ce4-acc9-4c76-82e5-a2bfbbf6ed92';
    userId && Meteor.default_connection.setUserId(userId);
    Meteor.loginWithToken('a40cf69c-39d7-4570-8110-f60a00435731', function () {
      Meteor.accounts.makeClientLoggedOut();
    });
  }

});
