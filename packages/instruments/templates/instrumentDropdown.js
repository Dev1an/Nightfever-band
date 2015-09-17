Template.instrumentDropdown.onCreated(function() {
	this.subscribe('instruments')
	var self = this
})

function updateDropdownValue(template) {
	var user = Meteor.user()
	if (user && user.profile && user.profile.instruments) {
		if (Instruments.find({_id: {$in: Meteor.user().profile.instruments}}).count() > 0) {
			template.component.dropdown('set exactly', Meteor.user().profile.instruments)
		} else if (Meteor.user().profile.instruments.length == 0) {
			template.component.dropdown('clear')
		}
	}
}

Template.instrumentDropdown.onRendered(function() {
	this.component = this.$('.ui.dropdown')
	this.input = this.component.find('input')
	var template = this

	this.autorun(function() {updateDropdownValue(template)})
})

Template.instrumentDropdown.helpers({
	categories: function() {return InstrumentCategories.find()},
	myInstruments: function() {
		if(Meteor.user()) {
			return Meteor.user().profile.instruments.join(',')
		}
	},
	insertedHandler: function() {
		var template = Template.instance()
		return function(context) {
			updateDropdownValue(template)
		}
	}
})

Template.simpleMenuItem.onRendered(function() {
	var context = this.data
	context.insertedHandler(context)
})

Template.instrumentDropdown.events({
	'uiChange': function(event, callback) {
		instruments = event.value == '' ? [] : event.value.split(',')
		if (Meteor.user) {
			Meteor.users.update(Meteor.userId(), {
				$set: {'profile.instruments': instruments}
			})
		}
	}
})