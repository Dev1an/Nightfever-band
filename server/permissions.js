Meteor.methods({
	userList() {
		if (adminExists()) throw new Meteor.Error('no-permission', 'You have no permission to request the user list')
		return Meteor.users.find({}, {
			fields: {'profile.name': 1, 'emails.address': 1, services: 1}
		}).map(user => {
			if (user.profile && user.profile.name != undefined) var {profile: {name}} = user
			else var name = user.emails[0].address
			
			const service = _.intersection(_.keys(user.services), ['facebook', 'google', 'password'])[0]
			return {name, service, _id: user._id}
		})
	},

	adminExists,

	addAdmin(userId) {
		if (adminExists()) throw new Meteor.Error('There is already an admin defined')
		OrbitPermissions.addAdmins(userId)
	}
})

function adminExists() {
	return Meteor.users.find({orbit_roles: 'permissions:admin'}).count() > 0
}