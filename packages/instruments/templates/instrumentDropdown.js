Template.instrumentDropdown.onCreated(function() {
	this.subscribe('instruments')
	this.clearAll = ()=>{}
})

function updateDropdownValue(template) {
	var user = Meteor.user()
	if (user && user.profile && user.profile.instruments) {
		var userInstruments = user.profile.instruments
		if (Instruments.find({_id: {$in: userInstruments}}).count() > 0) {
			template.component.dropdown('set exactly', userInstruments)
		} else if (userInstruments.length == 0) {
			template.clearAll()
		}
	}
}

Template.instrumentDropdown.onRendered(function() {
	this.component = this.$('.ui.dropdown')
	this.input = this.component.find('input')
	var template = this

	var placeholder = this.$('.default.text').text()
	this.clearAll = function() {
		template.component.dropdown('clear')
		template.component.data().moduleDropdown.set.placeholderText(placeholder)
	}

	this.autorun(function() {updateDropdownValue(template)})
})

Template.instrumentDropdown.helpers({
	categories: function() {return InstrumentCategories.find()},
	insertedHandler: function() {
		var template = Template.instance()
		return function(context) {
			updateDropdownValue(template)
		}
	}
})

Template.registerHelper('myInstruments', function() {
	var user = Meteor.user()
	if (user && user.profile && user.profile.instruments) {
		return user.profile.instruments.join(',')
	}
})
Template.registerHelper('instrumentsFor', function(userId) {
	var user = Meteor.users.findOne(userId)
	if (user && user.profile && user.profile.instruments) {
		return Instruments.find({_id: {$in: user.profile.instruments}})
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