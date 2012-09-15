Template.usersAndGroups.helpers({
  humanize: function(str) {
    return _.humanize(str);
  },
  groups: function() {
    return Groups.groups.find();
  },
  users: function() {
    return Meteor.users.find();
  }
});

Template.user.helpers({
  userGroups: function() {
    var query = { userId: this._id };
    return Groups.groupsToUsers.find(query);
  },
  acceptClass: function() {
    return Session.get('acceptClass-' + this._id);
  }
});

Template.group.helpers({
  humanize: function(str) {
    return _.humanize(str);
  }
});

Template.userGroup.helpers({
  userGroup: function() {
    return Groups.groups.findOne(this.groupId);
  },
  user: function() {
    return Meteor.users.findOne(this.userId);
  },
  humanize: function(str) {
    return _.humanize(str);
  }
});

Template.group.rendered = function() {
  $(this.find('.group')).draggable({
    helper: "clone",
    cursor: "move"
  });
};

Meteor.startup(function() {
  Meteor.users.find().forEach(function(user) {
    Session.set('acceptClass-' + user._id, '');
  });
});

Template.user.rendered = function() {
  this.runOnce = true;

  var $user = $(this.find('.user'));
  var userId = $user.data('id');

  $user.droppable({
		drop: function(event, ui) {
		  var groupName = ui.draggable.data('name');
		  Groups.addUserToGroup(userId, groupName);
      Session.set('acceptClass-' + userId, '');
		},
		over: function(event, ui) {
		  var groupName = ui.draggable.data('name');
      if (Groups.isUserInGroup(userId, groupName))
        Session.set('acceptClass-' + userId, 'deny');
      else
        Session.set('acceptClass-' + userId, 'accept');
		},
		out: function(event) {
      Session.set('acceptClass-' + userId, '');
		}
	})
};

Template.userGroup.events({
  'click .removeUserGroup': function(e, template) {
    e.preventDefault();
    var $group = $(template.find('.userGroup'));
    var userId = $group.data('user-id');
    var groupName = $group.data('group-name');
    Groups.removeUserFromGroup(userId, groupName);
  }
});
