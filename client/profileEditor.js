Template.profileSettings.onCreated(function() {
	this.subscribe('instruments')
	this.subscribe('userData')
})

Template.profileSettings.helpers({
	userId: Meteor.userId,
	mailAddress(userId) {
		const user = Meteor.users.findOne(userId)
		if (hasGoogleService(user)) {
			return user.services.google.email
		} else if (hasFacebookService(user)) {
			return user.services.facebook.email
		} else return user.emails[0].address
	}
})

Meteor.users.helpers({
	hasGoogleService() {return this.services && this.services.google},
	hasFacebookService() {return this.services && this.services.facebook},
	firstName() {
		if (this.hasGoogleService()) {
			return this.services.google.given_name
		} else if (this.hasFacebookService()) {
			return this.services.facebook.first_name
		}
	},
	lastName() {
		if (this.hasGoogleService()) {
			return this.services.google.family_name
		} else if (this.hasFacebookService()) {
			return this.services.facebook.last_name
		}
	}
})

Template.registerHelper('firstName', userId => {
	const user = Meteor.users.findOne(userId)
	if (user) return user.firstName()
})

Template.registerHelper('lastName', userId => {
	const user = Meteor.users.findOne(userId)
	if (user) return user.lastName()
})

function hasGoogleService(user) {
	return user.services && user.services.google
}

function hasFacebookService(user) {
	return user.services && user.services.facebook
}