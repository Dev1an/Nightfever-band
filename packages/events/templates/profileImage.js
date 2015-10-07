Template.profileImage.helpers({
	avatar(userId) {
		return Avatar.getUrl(Meteor.users.findOne(userId))
	},
	name() {
		return username(this.userId)
	}
})

Template.profileImage.onRendered(function() {
	this.$('img.avatar').popup({
		popup: this.find('.popup'),
	})
})

Avatar.setOptions({defaultImageUrl: '/contacts.png'})

username = function(id) {
	var user = Meteor.users.findOne(id)
	if (user && user.emails && user.emails[0] && user.emails[0].address)
		return user.emails[0].address
	else if (user && user.profile && user.profile.name)
		return user.profile.name
	else
		return 'Loading'
}