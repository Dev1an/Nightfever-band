Template.modalViewer.onRendered( () => {
	this.$('.ui.modal')
		.modal('setting', 'transition', 'vertical flip')
		.modal('show')
})