Template.upcoming.onCreated(function() {
	this.subscribe('events')
	this.subscribe('userData')
})

Template.upcoming.helpers({
	events: function() {
		return Events.find()
	}
})

Template.upcoming.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

function attending() {
	return _.contains(this.attendees, Meteor.userId())
}

Template.upcomingEventItem.helpers({
	month: function() {
		return moment(this.date).format('MMMM')
	},
	day: function() {return moment(this.date).format('Do')},
	attending: attending,
	buttonState: function() {
		return attending.apply(this)?"active":""
	},
	avatar: function(userId) {
		return Avatar.getUrl(Meteor.users.findOne(userId))
	}
})

Template.upcomingEventItem.events({
	'click button.attend.toggle': function() {
		if (attending.apply(this)) {
			this.leave()
		} else {
			this.attend()
		}
	}
})