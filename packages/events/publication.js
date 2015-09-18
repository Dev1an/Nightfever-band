Meteor.publish('events', function() {
	return Events.find({}, {sort: {date: 1}})
})