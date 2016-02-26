Meteor.publish('events', function() {
	var today = new Date()
	today.setHours(0)
	today.setMinutes(0)
	today.setSeconds(0)
	return Events.find({date: {$gte: today}}, {sort: {date: 1}})
})