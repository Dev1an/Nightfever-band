Template.upcoming.onCreated(function() {
	this.autorun(() => this.subscribe(FlowRouter.getRouteName() == 'Past' ? 'events.past' : 'events'))
	this.subscribe('instruments')
	this.hasInstruments = new ReactiveVar(true)
	this.subscribe('userData', ()=> {
		const profile = Meteor.user().profile;
		this.hasInstruments.set(profile && profile.instruments && profile.instruments.length > 0) 
	})
})

Template.upcoming.helpers({
	events() {
		return Events.find()
	},
	name() {
		return username(Meteor.userId())
	},
	hasInstruments() {
		return Template.instance().hasInstruments.get()
	}
})

function confirmationFor(event) {
	return _.findWhere(Events.findOne(event._id).confirmations, {userId: Meteor.userId()})
}

Template.upcomingEventItem.helpers({
	month() {
		return moment(this.date).format('MMMM')
	},
	day() {return moment(this.date).format('Do')},
	buttonColor() {
		var confirmation = confirmationFor(this)
		if (confirmation == undefined) 
			return ''
		else 
			return confirmation.attending ? 'green' : 'red'
	},
	pathToEvent() {
		return FlowRouter.path('event', {id: this._id})
	}
})

Template.upcomingEventItem.events({
	uiChange(event) {
		if (event.value == 'true') {
			this.attend()
		} else {
			this.leave()
		}
	}
})

Template.upcomingEventItem.onRendered(function() {
	var confirmationButton = this.$('.ui.dropdown')
	var template = this;
	this.autorun(function() {
		var confirmation = confirmationFor(template.data)
		if (confirmation != undefined) {
			if (confirmation.attending === true) {
				confirmationButton.dropdown('set exactly', 'true')
			} else if (confirmation.attending === false) {
				confirmationButton.dropdown('set exactly', 'false')
			}
		}
	})
})