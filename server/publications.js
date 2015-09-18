Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({}, {fields: {
    	'profile.instruments': 1,
    	'services.google.picture': 1, 'services.facebook.id': 1, 'profile.name': 1, 'emails': 1
    }});
  } else {
    this.ready();
  }
});