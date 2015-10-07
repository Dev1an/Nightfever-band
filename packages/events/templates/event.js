Template.eventInfo.onCreated(function() {
	this.subscribe('events')
	this.subscribe('instruments')
	this.subscribe('userData')
})

Template.eventInfo.helpers({
	event() {
		return Events.findOne(FlowRouter.getParam('id'))
	},
	format(date) {
		return moment(date).format('MMMM Do')
	},
	username(id) {
		return username(id)
	},
	positive(confirmations) {
		return _.where(confirmations, {attending: true})
	},
	negative(confirmations) {
		return _.where(confirmations, {attending: false})
	},
	isMe(userId) {
		return Meteor.userId() == userId
	}
})

Template.eventInfo.events({
	'click .attend.button' () {
		this.attend()
	},
	'click .leave.button'() {
		Events.findOne(FlowRouter.getParam('id')).leave()
	}
})