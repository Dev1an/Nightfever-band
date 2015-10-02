const socialIconsMap = new Map();
socialIconsMap.set('facebook', 'facebook square')
socialIconsMap.set('google', 'google plus square')
socialIconsMap.set('password', 'mail square')

Tracker.autorun(function(){
	if (Meteor.userId() !== null) {
		Meteor.call('adminExists', (error, adminExists) => {
			if (!error && !adminExists) {
				FlowRouter.setQueryParams({modal: 'adminInitialization'})
			}
		})
	}
})

Template.adminInitialization.onCreated(function() {
	this.users = new ReactiveVar([]);
	Meteor.call('userList', (error, result) => {
		if (!error) {
			this.users.set(result)
		}
	})
})

Template.adminInitialization.helpers({
	users() {
		return Template.instance().users.get()
	},
	iconFor(service) {
		return socialIconsMap.get(service)
	}
})

Template.adminInitialization.events({
	'click .approve': function(event, template) {
		Meteor.call('addAdmin', template.find('input.user').value)
		FlowRouter.setQueryParams('modal', null)
	}
})