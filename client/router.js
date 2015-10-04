FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "login"});
  },
  name: 'root'
});

FlowRouter.route('/upcoming', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "upcoming"});
	}
});

FlowRouter.route('/event/:id', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "eventInfo"});
	}
});

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