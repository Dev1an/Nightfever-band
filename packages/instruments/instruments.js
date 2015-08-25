// Write your package code here!
Instruments = new Mongo.Collection('instruments')
InstrumentCategories = new Mongo.Collection('instrumentCategories', {
	transform: function(category) {
		category.instruments = category.instrumentIds.map(function(instrumentId) {
			return Instruments.findOne(instrumentId)
		})
		return category
	}
})