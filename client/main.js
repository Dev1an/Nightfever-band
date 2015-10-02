Template.mainLayout.helpers({
	modal() {
		const modalName = FlowRouter.getQueryParam('modal')
		if (modalName !== undefined && Template[modalName] !== undefined) {
			return modalName
		}
	}
})