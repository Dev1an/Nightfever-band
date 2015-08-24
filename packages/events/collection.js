// Mongo collection
Events = new Mongo.Collection('events')

// Schema
Events.attachSchema({
	date: {
		type: Date,
		label: 'Date'
	},
	attendees: {
		type: [Object],
		defaultValue: []
	},
	'attendees.$.userId': {
		type: String
	},
	'attendees.$.attending': {
		type: Boolean
	}
})