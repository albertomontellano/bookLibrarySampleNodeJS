var app = app || {};
app.AddListView = Backbone.View.extend({
	el: '#adds',
	initialize: function(  ) {
		this.collection = new app.AddList();
		this.collection.fetch({reset: true}); // NEW
		this.render();
		this.listenTo( this.collection, 'add', this.renderAdd );
		this.listenTo( this.collection, 'reset', this.render ); // NEW
	},
	
	events:{
		'click #add':'addAdd'
	},
	addAdd: function( e ) {
		e.preventDefault();
		var formData = {};
		$( '#addAdd div' ).children( 'input' ).each( function( i, el ) {
			if( $( el ).val() != '' ){
				if( el.id === 'keywords' ) {
					formData[ el.id ] = [];
					_.each( $( el ).val().split(' '), function( keyword ) {
						formData[ el.id ].push({ 'keyword': keyword });
					});
				} else if( el.id === 'releaseDate' ) {
					formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
				} 
				else {
					formData[ el.id ] = $( el ).val();
				}
			}
			// Clear input field value
			$( el ).val('');
		});
		this.collection.create( formData );
	},
	
	// render a list of Adds by rendering each Add in its collection
	render: function() {
		this.collection.each(function( item ) {
			console.log("Rendering in addList view:");
			console.log(item);
			this.renderAdd( item );
		}, this );
	},
	// render an Add by creating an AddView and appending the
	// element it renders to the library's element
	renderAdd: function( item ) {
		var addView = new app.AddView({
			model: item
		});
		this.$el.append( addView.render().el );
	}
	
	
	
});