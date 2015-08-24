Meteor.methods({
	attendToEvent: function(eventId){
		check(this.userId, String)
		
		var event = Events.findOne(eventId)
		check(event, Object)
		Events.update(eventId, {$addToSet: {attendees: this.userId}})
	},
	leaveEvent: function(eventId) {
		check(this.userId, String)
		var event = Events.findOne(eventId)
		check(event, Object)
		Events.update(eventId, {$pull: {attendees: this.userId}})
	}
})