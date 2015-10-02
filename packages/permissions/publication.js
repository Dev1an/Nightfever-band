Meteor.publish('permissions', function() {
	return Permissions.find();
})