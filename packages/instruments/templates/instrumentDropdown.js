Template.instrumentDropdown.onCreated(function() {
	this.subscribe('instruments')
	var self = this
})

Template.instrumentDropdown.onRendered(function() {
	this.component = this.$('.ui.dropdown').dropdown()
	console.log('component bound')
})

Template.instrumentDropdown.helpers({
	categories: function() {return InstrumentCategories.find()},
	myInstruments: function() {
		return Meteor.user().profile.instruments.join(',')
	},
	insertedHandler: function() {
		var template = Template.instance()
		return function(context) {
			var user = Meteor.user()
			if (user && user.profile && user.profile.instruments)
				if (Instruments.find({_id: {$in: Meteor.user().profile.instruments}}).count() > 0) 
					template.component.dropdown('set exactly', user.profile.instruments)
		}
	}
})

Template.simpleMenuItem.onRendered(function() {
	var context = this.data
	context.insertedHandler(context)
})

Template.instrumentDropdown.events({
	change: function(event, callback) {
		if (Meteor.user) {
			Meteor.users.update(Meteor.userId(), {
				$set: {'profile.instruments': event.target.value.split(',')}
			})
		}
	}
})