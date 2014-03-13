var app = app || {};
app.Add = Backbone.Model.extend({
	defaults: {
	coverImagePath: 'img/placeholder.jpg',
	title: 'No title',
	authorId: '1',
	releaseDate: 'Unknown',
	description: 'This is a sample description.',
	price: '0.0',
	keywords: 'None'
	},
	parse: function( response ) {
		response.id = response._id;
		return response;
	}
});