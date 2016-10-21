Template.navigationBar.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

Template.navigationBar.helpers({
	accountMenu: secondaryNavigation,
	mainMenu: primaryNavigation,
	event: eventNavigationItem,
	showEvent(currentItem) {
		if (eventNavigationItem.isActive()) {
			const pastItem = currentItem.route.name == "Past"
			const inPast = eventNavigationItem.inPast()
			return pastItem ? inPast : !inPast
		}
		return false
	},
	profileActive() {
		return FlowRouter.getRouteName() == 'profile'
	},
});

Template.navigationItem.events({
	click() { this.visit() }
});