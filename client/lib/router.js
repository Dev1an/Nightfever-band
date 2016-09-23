secondaryNavigation = new NavigationSystem()

FlowRouter.route('/', {
	name: 'root',
 	action() {
		BlazeLayout.render("mainLayout", {content: "login", noMenuBar: true})
	}
});

FlowRouter.route('/upcoming', {
	name: 'upcoming',
	action() {
		BlazeLayout.render("mainLayout", {content: "upcoming"});
	}
});

FlowRouter.route('/past', {
	name: 'past',
	action() {
		BlazeLayout.render("mainLayout", {content: "upcoming"});
	}
});

FlowRouter.route('/event/:id', {
	name: 'event',
	action() {
		BlazeLayout.render("mainLayout", {content: "eventInfo"});
	}
});

FlowRouter.route('/profile', {
	name: 'profile',
	action() {
		BlazeLayout.render("mainLayout", {content: "profileSettings"});
	}
})
secondaryNavigation.addItem({routeName: 'profile', title: 'Edit'})

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
