mailgun = new Mailgun(Meteor.settings.mailgun);

Meteor.methods({
	addMailAddress(address) {
		if (this.userId === null) throw new Meteor.Error('Not logged in')
		Accounts.addEmail(this.userId, address)
		Accounts.sendVerificationEmail(this.userId, address)
	}
})