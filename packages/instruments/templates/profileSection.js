Template.profileInstrumentSection.onCreated(function() {
	this.subscribe('instruments')
})

Template.profileInstrumentSection.onRendered(function() {
	this.$('.ui.dropdown').dropdown()
})

Template.profileInstrumentSection.helpers({
	categories: function() {return InstrumentCategories.find()}
})