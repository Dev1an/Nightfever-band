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

Template.registerHelper('firstName', userId => {
	const user = Meteor.users.findOne(userId)
	if (user) {
		if (user.services && user.services.google) {
			return user.services.google.given_name
		} else if (user.services && user.services.facebook) {
			return user.services.facebook.first_name
		}
	}
})

Template.registerHelper('lastName', userId => {
	const user = Meteor.users.findOne(userId)
	if (user) {
		if (hasGoogleService(user)) {
			return user.services.google.family_name
		} else if (hasFacebookService(user)) {
			return user.services.facebook.last_name
		}
	}
})

function hasGoogleService(user) {
	return user.services && user.services.google
}

function hasFacebookService(user) {
	return user.services && user.services.facebook
}