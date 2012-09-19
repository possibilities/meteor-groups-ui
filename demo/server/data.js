// Meteor.users.remove({});
// Groups.groups.remove({});
// Groups.groupsToUsers.remove({});

Groups.findOrCreateGroup('log-manager');
Groups.findOrCreateGroup('story-manager');

var user = Meteor.users.findOne({
  username: 'possibilities'
});
Groups.addUserToGroup(user, 'group-manager');
