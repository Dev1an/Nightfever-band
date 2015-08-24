Events = new Mongo.Collection('events')

EventScheme = new SimpleSchema({
	date: {
		type: Date,
		label: 'Date'
	}
})

Events.attachSchema(EventScheme)