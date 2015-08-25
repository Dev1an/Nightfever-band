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

Template.profileImage.helpers({
	avatar: function(userId) {
		return Avatar.getUrl(Meteor.users.findOne(userId))
	},
	name: function() {
		var user = Meteor.users.findOne(this.toString())
		if (!user)
			return 'Loading'
		else if (!user.profile || !user.profile.name)
			return user.emails[0].address
		else
			return user.profile.name
	}
})

Template.profileImage.onRendered(function() {
	this.$('img').popup({
		popup: this.find('.popup'),
	})
})

Avatar.setOptions({defaultImageUrl: '/contacts.png'})