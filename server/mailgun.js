mailgun = new Mailgun(Meteor.settings.mailgun);

mailgun.post = Meteor.wrapAsync(function(path, data, callback) {
	mailgun.api.post(path, data, callback);
})

mailgun.put = Meteor.wrapAsync(function(path, data, callback) {
	mailgun.api.put(path, data, callback);
})

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
	},

	subscribe(address) {
		if (!_.contains(Meteor.users.findOne(this.userId).verifiedMailAddresses(), address)) throw new Meteor.Error('Address not verified')
		try {
			const subscription = mailgun.post('/lists/test@nightfever.band/members', { address: address, upsert: true })
			Meteor.users.update(this.userId, {$set: {subscriptionAddress: subscription.member.address}})			
		} catch(error) {
			throw new Meteor.Error('Mailgun API error', error.message)
		}
	},

	unsubscribe(address) {
		if (!_.contains(Meteor.users.findOne(this.userId).verifiedMailAddresses(), address)) throw new Meteor.Error('Address not verified')
		try {
			const subscription = mailgun.put(`/lists/test@nightfever.band/members/${address}`, { subscribed: false })
			Meteor.users.update(this.userId, {$unset: {subscriptionAddress: ''}})
		} catch(error) {
			throw new Meteor.Error('Mailgun API error', error.message)
		}
	}
})