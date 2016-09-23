Template.navigationBar.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

Template.navigationBar.helpers({
	accountMenuItems() {
		return secondaryNavigation.topLevelItems()
	},
	profileActive() {
		return FlowRouter.getRouteName() == 'profile'
	},
	isActive(item) {
		return FlowRouter.getRouteName() == item
	},
	eventTitle() {
		const event = Events.findOne(FlowRouter.getParam('id'))
		if (event) return moment(event.date).format('MMMM Do')
	},
	isUpcomingEvent(upcoming) {
		if (FlowRouter.getRouteName() == 'event') {
			const event = Events.findOne(FlowRouter.getParam('id'))
			if (typeof event != "undefined") {
				var today = new Date()
				today.setHours(0)
				today.setMinutes(0)
				today.setSeconds(0)
				return upcoming ? event.date > today : event.date <= today
			}
		}
		return false
	}
})

Template.navigationItems.helpers({
	beforeLast(list) {
		return list.slice(0, -1)
	},
	last(list) {
		return list[list.length - 1]
	},
	pathToRoute() {
		return FlowRouter.path(this.routeName)
	}
})