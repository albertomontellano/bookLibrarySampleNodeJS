var app = app || {};
app.AddView = Backbone.View.extend({
	tagName: 'div',
	className: 'addContainer',
	template: _.template( $('#addTemplate').html() ),
	events: {
		'click .delete': 'deleteAdd'
	},
	deleteAdd: function() {
		console.log("Deleting model...");
		// Delete model
		console.log(this.model);
		this.model.destroy();
		// Delete view
		this.remove();
	},
	render: function() {
		// tmpl is a function that takes a JSON object and returns html
		// this.el is what we defined in tagName. use $el to get access
		// to jQuery html() function
		console.log("Inside render of add.js");
		this.$el.html( this.template( this.model.toJSON() ));
		return this;
	}
});