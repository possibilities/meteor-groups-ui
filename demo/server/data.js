// Groups.groups.remove({});
// Groups.groupsToUsers.remove({});

if (Meteor.users.find().count() < 3) {
  Meteor.createUser({
    username: 'possibilities',
    email: 'mikebannister@gmail.com'
  });

  Meteor.createUser({
    username: 'mark',
    email: 'markbannister@gmail.com'
  });

  Meteor.createUser({
    username: 'joey',
    email: 'joey@gmail.com'
  });
}

if (Groups.groupsToUsers.find().count() < 3) {
  var user = Meteor.users.findOne();
  Groups.findOrCreateGroup('group-admin');
  Groups.findOrCreateGroup('log-admin');
  Groups.findOrCreateGroup('story-admin');
}
