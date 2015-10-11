mailgun = new Mailgun(Meteor.settings.mailgun);

Meteor.methods({
	addMailAddress(address) {
		if (this.userId === null) throw new Meteor.Error('Not logged in')
		if (_.contains(Meteor.users.findOne(this.userId).verifiedMailAddresses(), address)) throw new Meteor.Error('Address already used')
		Accounts.addEmail(this.userId, address)
		Accounts.sendVerificationEmail(this.userId, address)
	},

	sendVerificationEmail(address) {
		if (this.userId === null) throw new Meteor.Error('Not logged in')
		Accounts.sendVerificationEmail(this.userId, address)
	}
})