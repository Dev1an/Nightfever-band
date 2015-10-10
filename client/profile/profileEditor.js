Template.profileSettings.onCreated(function() {
	this.subscribe('instruments')
	this.subscribe('userData')
})

Template.profileSettings.helpers({
	user() {return Meteor.user()},
})

Template.registerHelper( 'multiple', list => unwrap(list, 'length')>1 )