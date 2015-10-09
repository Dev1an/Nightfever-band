Template.navigationBar.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

Template.navigationBar.helpers({
	mainMenuItems() {
		return mainNavigation.topLevelItems()
	},
	accountMenuItems() {
		return secondaryNavigation.topLevelItems()
	},
	profileActive() {
		return FlowRouter.getRouteName() == 'profile'
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