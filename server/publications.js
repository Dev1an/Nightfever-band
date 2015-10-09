Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({}, {fields: {
    	'profile.instruments': 1,

    	'services.google.picture': 1,
    	'services.google.given_name': 1,
    	'services.google.family_name': 1,
    	'services.google.email': 1,

      'services.facebook.id': 1,
      'services.facebook.first_name': 1,
      'services.facebook.last_name': 1,

    	'profile.name': 1,

    	'emails': 1
    }});
  } else {
    this.ready();
  }
});