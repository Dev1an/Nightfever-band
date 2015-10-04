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
  api.use(['templating', 'momentjs:moment@2.10.6', 'utilities:avatar@0.8.2', 'underscore'], 'client');
  api.use(['aldeed:collection2@2.3.3', 'instruments', 'orbit:permissions@0.1.1', 'ecmascript']);

  // common files
  api.addFiles(['methods.js', 'collection.js', 'generator.js']);

  // server files
  api.addFiles(['publication.js'], 'server');

  // client files
  api.addFiles(['templates/upcoming.html', 'templates/upcoming.js'], 'client')
  api.addFiles(['templates/event.html', 'templates/event.js'], 'client')

  api.export('Events')
  api.export('dayOfTheWeekOfTheMonthFunction')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('events');
  api.addFiles('events-tests.js');
});