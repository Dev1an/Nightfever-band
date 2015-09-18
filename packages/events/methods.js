Meteor.methods({
	attendToEvent: function(eventId){
		check(this.userId, String)
		
		var event = Events.findOne(eventId)
		check(event, Object)

		confirm(true, eventId, this.userId)
	},
	leaveEvent: function(eventId) {
		check(this.userId, String)
		var event = Events.findOne(eventId)
		check(event, Object)

		confirm(false, eventId, this.userId)
	}
})

function confirm(attending, eventId, userId) {
	var userConfirmationQuery = {
		'_id': eventId,
		'confirmations.userId': userId
	}
	if (Events.find(userConfirmationQuery).count() > 0) {
		console.log('user already confirmed')
		Events.update(userConfirmationQuery, {
			$set: {
				'confirmations.$.attending': attending
			}
		})
	} else {
		console.log('new confirmation')
		Events.update(eventId, {
			$push: {
				confirmations: {
					userId: userId,
					attending: attending
				}
			}
		})
	}
}
