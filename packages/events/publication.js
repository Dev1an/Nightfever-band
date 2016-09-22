Meteor.publish('events', function() {
	var today = new Date()
	today.setHours(0)
	today.setMinutes(0)
	today.setSeconds(0)
	return Events.find({date: {$gte: today}}, {sort: {date: 1}})
}),

Meteor.publish('event', function(id) {
	return Events.find(id)
})

Meteor.publish('events.past', function() {
	var today = new Date()
	today.setHours(0)
	today.setMinutes(0)
	today.setSeconds(0)
	return Events.find({date: {$lt: today}}, {sort: {date: 1}})
})