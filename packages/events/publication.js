Meteor.publish('events', function() {
	return Events.find({}, {sort: {date: 1}})
})

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({},
                             {fields: {'services.google.picture': 1, 'services.facebook.id': 1, 'profile.name': 1}});
  } else {
    this.ready();
  }
});