FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "login"});
  }
});

FlowRouter.route('/upcoming', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "upcoming"});
	}
});

Tracker.autorun(function() {
	FlowRouter.watchPathChange()
	var user = Meteor.userId(), path = FlowRouter.current().path
	if (user && path=='/')
		FlowRouter.go('/upcoming')
	else if (user==undefined && path!='/')
		FlowRouter.go('/')
})

FlowRouter.route('/serviceSetup', {
	action: function() {
		BlazeLayout.render("mainLayout", {content: "serviceSetup"});
	}
});