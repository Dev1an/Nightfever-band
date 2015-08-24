// Mongo collection
Events = new Mongo.Collection('events', {
	transform: function(event) {
		event.attend = function() {Meteor.call('attendToEvent', event._id)}
		event.leave  = function() {Meteor.call('leaveEvent', event._id)}
		return event
	}
})

// Schema
Events.attachSchema({
	date: {
		type: Date,
		label: 'Date'
	},
	attendees: {
		type: [String],
		defaultValue: []
	}
})