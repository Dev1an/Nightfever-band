mainNavigation = new NavigationSystem()

FlowRouter.route('/', {
	name: 'root',
 	action() {
		BlazeLayout.render("mainLayout", {content: "login"});
	}
});

FlowRouter.route('/upcoming', {
	name: 'upcoming',
	action() {
		BlazeLayout.render("mainLayout", {content: "upcoming"});
	}
});
mainNavigation.addItem({routeName: 'upcoming'})

FlowRouter.route('/event/:id', {
	name: 'event',
	action: function() {
		BlazeLayout.render("mainLayout", {content: "eventInfo"});
	}
});
mainNavigation.addItem({routeName: 'event', unwindRoute: 'upcoming'})

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