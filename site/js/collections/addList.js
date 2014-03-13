var app = app || {};
app.AddList = Backbone.Collection.extend({
	model: app.Add,
	url: '/api/adds' // NEW
});