Meteor.startup(function() {
	if (Instruments.find().count() == 0 && InstrumentCategories.find().count() == 0) {
		_.each({
			'musical instrument': ['piano', 'violin', 'viola', 'cello', 'flute', 'recorder', 'oboe', 'bassoon', 'guitar', 'bass guitar', 'percussion'],
			'voice': ['soprano voice', 'alto voice', 'tenor voice', 'bass voice']			
		}, function(instruments, category) {
			var instrumentIds = []
			instruments.forEach(function(instrument) {
				instrumentIds.push(
					Instruments.insert({name: instrument})
				)
			})
			InstrumentCategories.insert({name: category, instrumentIds: instrumentIds})
		})
	}
})

Meteor.publish('instruments', function() {
	return [Instruments.find(), InstrumentCategories.find()]
})

Roles.addPermission('admin', 'instruments:insert', 'instruments:update', 'instruments:remove')

var crudAdmin = {
	insert: userId => { return Roles.permissionTo('instruments:insert', userId) },
	update: userId => { return Roles.permissionTo('instruments:update', userId) },
	remove: userId => { return Roles.permissionTo('instruments:remove', userId) }
}

Instruments.allow(crudAdmin)
InstrumentCategories.allow(crudAdmin)