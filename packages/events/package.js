Package.describe({
  name: 'events',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Plan your nightfever events',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use(['templating', 'momentjs:moment@2.10.6', 'utilities:avatar@0.8.2'], 'client');
  api.use(['aldeed:collection2@2.3.3', 'instruments']);

  // common files
  api.addFiles(['methods.js', 'collection.js']);

  // server files
  api.addFiles(['generator.js', 'publication.js'], 'server');

  // client files
  api.addFiles(['templates/upcoming.html', 'templates/upcoming.js'], 'client')

  api.export('Events')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('events');
  api.addFiles('events-tests.js');
});