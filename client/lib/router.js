import {Menu, RouteItem} from 'meteor/devian:navigation'

primaryNavigation = new Menu();
secondaryNavigation = new Menu();

FlowRouter.route('/', {
	name: 'root',
 	action() {
		BlazeLayout.render("mainLayout", {content: "login", noMenuBar: true})
	}
});

eventNavigationItem = new RouteItem(
	FlowRouter.route('/event/:id', {
		name: 'event',
		action() {
			BlazeLayout.render("mainLayout", {content: "eventInfo"});
		}
	}),
	function() {
		const event = Events.findOne(FlowRouter.getParam('id'))
		if (event) return moment(event.date).format('MMMM Do')
	}
);
today = new Date();
today.setHours(0); today.setMinutes(0); today.setSeconds(0);
eventNavigationItem.inPast = function() {
	const event = Events.findOne(FlowRouter.getParam('id'))
	if (event) return today > event.date;
}

primaryNavigation.addItem(
	FlowRouter.route('/upcoming', {
		name: 'Upcoming',
		action() {
			BlazeLayout.render("mainLayout", {content: "upcoming"});
		}
	}),
	() => 'Upcoming' + (!eventNavigationItem.inPast() && eventNavigationItem.isActive() ? ':': '')
);

primaryNavigation.addItem(
	FlowRouter.route('/past', {
		name: 'Past',
		action() {
			BlazeLayout.render("mainLayout", {content: "upcoming"});
		}
	}),
	() => 'Past' + (eventNavigationItem.inPast() && eventNavigationItem.isActive() ? ':': '')
);

secondaryNavigation.addItem(
	FlowRouter.route('/profile', {
		name: 'profile',
		action() {
			BlazeLayout.render("mainLayout", {content: "profileSettings"});
		}
	}),
	'Edit'
);

Tracker.autorun(function() {
	const user = Meteor.userId(), route = FlowRouter.getRouteName()
	if (FlowRouter.current().route !== undefined) {
		if (user && route=='root')
			FlowRouter.go('/upcoming')
		else if (user==undefined && route!='root') {
			FlowRouter.go('/')
		}		
	}
})

FlowRouter.route('/serviceSetup', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "serviceSetup"});
	}
});
