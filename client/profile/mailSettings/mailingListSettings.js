Template.addMailAddress.onCreated(function() {
	this.validAddress = new ReactiveVar(false)
	this.emailAddress = new ReactiveVar('')
})

Template.addMailAddress.onRendered(function() {
	this.emailField = this.find('input');
})

Template.addMailAddress.helpers({
	validator() {
		const template = Template.instance()
		return template.emailAddress.get()=='' || template.validAddress.get() ? '' : 'error'
	},
	enableButton() {
		return Template.instance().validAddress.get() ? '' : 'disabled'
	}
})

Template.addMailAddress.events({
	'click .addMailAddress.button'(event, template) {
		Meteor.call('addMailAddress', template.emailField.value)
	},
	'input input'(event, template) {
		const mailAddress = template.emailField.value
		template.validAddress.set(Match.test(mailAddress, MatchLib.EmailAddress))
		template.emailAddress.set(mailAddress)
	}
})