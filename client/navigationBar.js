Template.navigationBar.events({
	'click nav .logout': function() {
		Meteor.logout()
	}
})

Template.navigationBar.helpers({
	items() {
		return mainNavigation.topLevelItems()
	},
	beforeLast(list) {
		return list.slice(0, -1)
	},
	last(list) {
		return list[list.length - 1]
	}
})