Template.profileInstrumentSection.onCreated(function() {
	this.subscribe('instruments')
})

Template.profileInstrumentSection.onRendered(function() {
	this.$('.ui.dropdown').dropdown()
})

Template.profileInstrumentSection.helpers({
	categories: function() {return InstrumentCategories.find()}
})

Template.profileInstrumentSection.events({
	change: function(event, callback) {
		if (Meteor.user) {
			Meteor.users.update(Meteor.userId(), {
				$set: {'profile.instruments': event.target.value.split(',')}
			})
		}
	}
})