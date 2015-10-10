Meteor.users.helpers({
	hasGoogleService() {return unwrap(this.services, 'google') != undefined },
	hasFacebookService() {return unwrap(this.services, 'facebook') != undefined },
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
	},
	verifiedMailAddresses() {
		const verifiedAdresses = _.reduce(this.emails, (filteredList, mail) => {
			if (mail.verified) filteredList.push(mail.address)
			return filteredList
		}, [])
		if (this.hasGoogleService())   verifiedAdresses.push(this.services.google.email)
		if (this.hasFacebookService()) verifiedAdresses.push(this.services.facebook.email)
		return verifiedAdresses
	}
})