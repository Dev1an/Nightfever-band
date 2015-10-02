Package.describe({
  name: 'permissions',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Coupling permissions to roles',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2')
  api.use(['mongo', 'ecmascript', 'alanning:roles@1.2.13'])

  api.addFiles('permissions.js')
  api.addFiles('publication.js', 'server')

  api.export('Permissions')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('permissions');
  api.addFiles('permissions-tests.js');
});
