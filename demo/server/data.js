// Meteor.users.remove({});
// Groups.groups.remove({});
// Groups.groupsToUsers.remove({});

Groups.findOrCreateGroup('log-admin');
Groups.findOrCreateGroup('story-admin');

var user = Meteor.users.findOne({
  username: 'possibilities'
});
Groups.addUserToGroup(user, 'group-manager');
