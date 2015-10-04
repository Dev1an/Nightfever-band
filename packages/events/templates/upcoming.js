Template.upcoming.onCreated(function() {
	this.subscribe('events')
	this.subscribe('instruments')
	this.hasInstruments = new ReactiveVar(true)
	this.subscribe('userData', ()=> {
		const profile = Meteor.user().profile;
		this.hasInstruments.set(profile && profile.instruments && profile.instruments.length > 0) 
	})
})

Template.upcoming.helpers({
	events: function() {
		return Events.find()
	},
	name: function() {
		return username(Meteor.userId())
	},
	hasInstruments() {
		return Template.instance().hasInstruments.get()
	}
})

Template.upcoming.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

function confirmationFor(event) {
	return _.findWhere(Events.findOne(event._id).confirmations, {userId: Meteor.userId()})
}

Template.upcomingEventItem.helpers({
	month: function() {
		return moment(this.date).format('MMMM')
	},
	day: function() {return moment(this.date).format('Do')},
	buttonColor: function() {
		var confirmation = confirmationFor(this)
		if (confirmation == undefined) 
			return ''
		else 
			return confirmation.attending ? 'green' : 'red'
	}
})

Template.upcomingEventItem.events({
	'uiChange': function(event) {
		if (event.value == 'true') {
			this.attend()
		} else {
			this.leave()
		}
	}
})

Template.upcomingEventItem.onRendered(function() {
	var confirmationButton = this.$('.ui.dropdown')
	var template = this;
	this.autorun(function() {
		var confirmation = confirmationFor(template.data)
		if (confirmation != undefined) {
			if (confirmation.attending === true) {
				confirmationButton.dropdown('set exactly', 'true')
			} else if (confirmation.attending === false) {
				confirmationButton.dropdown('set exactly', 'false')
			}
		}
	})
})

Template.profileImage.helpers({
	avatar: function(userId) {
		return Avatar.getUrl(Meteor.users.findOne(userId))
	},
	name: function() {
		return username(this.userId)
	}
})

Template.profileImage.onRendered(function() {
	this.$('div.clipping').popup({
		popup: this.find('.popup'),
	})
})

Avatar.setOptions({defaultImageUrl: '/contacts.png'})

username = function(id) {
	var user = Meteor.users.findOne(id)
	if (user && user.emails && user.emails[0] && user.emails[0].address)
		return user.emails[0].address
	else if (user && user.profile && user.profile.name)
		return user.profile.name
	else
		return 'Loading'
}