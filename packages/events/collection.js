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
	confirmations: {
		type: [Object],
		defaultValue: []
	},
	'confirmations.$.userId': {
		label: 'userId',
		type: SimpleSchema.RegEx.Id
	},
	'confirmations.$.attending': {
		label: 'attending',
		type: Boolean
	}
})