Package.describe({
  summary: "User interface for Meteor Groups"
});

Package.on_use(function(api) {
  api.use('underscore-string', 'client');
  api.use('templating', 'client');
  api.use('accounts-base', ['server', 'client']);
  api.use('groups', ['server', 'client']);

  api.add_files('vendor/jquery-ui/jquery.ui.core.js', 'client');
  api.add_files('vendor/jquery-ui/jquery.ui.widget.js', 'client');
  api.add_files('vendor/jquery-ui/jquery.ui.mouse.js', 'client');
  api.add_files('vendor/jquery-ui/jquery.ui.draggable.js', 'client');
  api.add_files('vendor/jquery-ui/jquery.ui.droppable.js', 'client');

  api.add_files('templates.html', 'client');
  api.add_files('ui.js', 'client');
  api.add_files('styles.css', 'client');
});
