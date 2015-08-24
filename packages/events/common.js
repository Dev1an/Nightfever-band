// Mongo collection
Events = new Mongo.Collection('events')

// Schema
Events.attachSchema({
	date: {
		type: Date,
		label: 'Date'
	}
})