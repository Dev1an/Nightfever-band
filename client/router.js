FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render("mainLayout", {content: "login"});
  }
});

AccountsTemplates.configure({
	onSubmitHook: function(error, state) {
		console.log(error, state)
	}
})