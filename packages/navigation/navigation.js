NavigationSystem = class NavigationSystem {
	constructor() {
		const nav = this;
		this.items = new Mongo.Collection(null, {
			transform(item) {
				item.unwindChain = function() {
					return nav.unwindChain()
				}
				item.active = function() {
					return FlowRouter.getRouteName() == item.routeName
				}
				return item
			}
		})

		this._unwindChain = new ReactiveVar(null);

		Tracker.autorun(() => {
			const routeName = FlowRouter.getRouteName()
			if (this.items.find({routeName, unwindRoute: {$exists: true}}).count() > 0) {
				this._unwindChain.set(this.calculateUnwindChain(routeName, []))
			} else {
				this._unwindChain.set(null)
			}
		})
	}

	unwindChain() {
		const routeNames = this._unwindChain.get();
		return routeNames == null ? null : routeNames.map(routeName => this.items.findOne({routeName}))
	}

	addItem({routeName, unwindRoute, title}) {
		if (!Match.test(routeName, String)) throw new Error('You must specify a routeName')
		if (this.items.find({routeName}).count() > 0) throw new Error('This route is already added')

		if (unwindRoute == undefined) {
			this.items.insert({routeName, title})
		} else {
			if (this.validUnwindRoute(unwindRoute))
				this.items.insert({routeName, unwindRoute, title})
			else
				throw new Error('invalid unwindRoute')
		}
	}

	topLevelItems() {
		return this.items.find({unwindRoute: {$exists: false}})
	}

	validUnwindRoute(routeName) {
		const item = this.items.find({routeName})

		if (item.count() == 0) return false

		if (this.items.find({unwindRoute: {$exists: false}, routeName}).count() > 0) {
			return true
		} else {
			return this.validUnwindRoute(item.fetch()[0].routeName)
		}
	}

	calculateUnwindChain(routeName, chain) {
		const item = this.items.find({routeName, unwindRoute: {$exists: true}})
		chain.unshift(routeName)
		if (item.count() > 0) {
			return this.calculateUnwindChain(item.fetch()[0].unwindRoute, chain)
		} else {
			return chain;
		}
	}
}