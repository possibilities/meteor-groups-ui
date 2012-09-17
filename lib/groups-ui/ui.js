Template.usersAndGroups.helpers({
  manageMode: function() {
    return Session.get('manageMode');
  }
});

Template.usersAndGroups.events({
  'click .add-group': function(e) {
    e.preventDefault();
    if (Session.get('manageMode'))
      Session.set('manageMode', false);
    else
      Session.set('manageMode', true);
  }
});

Template.groupsManager.helpers({
  humanize: function(str) {
    return _.humanize(str)+'x';
  },
  groups: function() {
    return Groups.groups.find();
  }
});

Template.groupsManager.events({
  'keydown input': function(e, template) {
    var $input = $(template.find('input'));
    if (e.keyCode === 13) {
      var groupName = $input.val();
      Groups.groups.insert({
        name: groupName
      });
      $input.val('');
    }
  },
  'keyup input': function(e, template) {
    var $input = $(template.find('input'));
    var originalName = $input.val();
    var name;
    // alphabet
    if (_.contains(_.range(65, 91), e.keyCode))
      name = originalName.toLowerCase();
    // space
    else if (e.keyCode === 32)
      name = originalName.replace(' ', '-');

    // If we got anything new update ui
    if (name)
      $input.val(name);
  }
});

Template.usersManager.helpers({
  humanize: function(str) {
    return _.humanize(str)+'x';
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

Template.deleteGroup.events({
  'click .deleteGroup': function(e, template) {
    var id = $(template.find('.deleteGroup')).data('id');
    Groups.groups.remove(id);
    Groups.groupsToUsers.remove({ groupId: id });
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
