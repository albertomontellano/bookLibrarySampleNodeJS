// Module dependencies.
var application_root = __dirname,
express = require( 'express' ), //Web framework
path = require( 'path' ), //Utilities for dealing with file paths
mongoose = require( 'mongoose' ); //MongoDB integration
//Create server
var app = express();
// Configure server
app.configure( function() {
	//parses request body and populates request.body
	app.use( express.bodyParser() );
	//checks request.body for HTTP method overrides
	app.use( express.methodOverride() );
	//perform route lookup based on URL and HTTP method
	app.use( app.router );
	//Where to serve static content
	app.use( express.static( path.join( application_root, 'site') ) );
	//Show all errors in development
	app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});

//Start server
var port = 4711;
app.listen( port, function() {
	console.log( 'Express server listening on port %d in %s mode',
	port, app.settings.env );
	console.log(application_root);
});

// Routes
app.get( '/api', function( request, response ) {
	response.send( 'Library API is running' );
});

//Connect to database
mongoose.connect( 'mongodb://localhost/simpleadd_database' );
//Schemas
var Add = new mongoose.Schema({
	title: String,
	authorId: String,
	description: String,
	price: Number,
	coverImagePath: String,
	releaseDate: Date,
	keywords: [ Keywords ] // NEW
});

//Schemas
var Keywords = new mongoose.Schema({
	keyword: String
});

//Models
var AddModel = mongoose.model( 'Add', Add );

//Get a list of all adds
app.get( '/api/adds', function( request, response ) {
	return AddModel.find( function( err, adds ) {
		if( !err ) {
		    console.log("SERVER SENDING ADS:");
			console.log(adds);
			return response.send( adds );
		} else {
			return console.log( err );
		}
	});
});

//Insert a new ad
app.post( '/api/adds', function( request, response ) {
	var add = new AddModel({
		title: request.body.title,
		authorId: request.body.authorId,
		description: request.body.description,
		price: request.body.price,
		coverImagePath: request.body.coverImagePath,
		releaseDate: request.body.releaseDate,
		keywords: request.body.keywords // NEW
	});
	add.save( function( err ) {

		if( !err ) {
			return console.log( 'created' );
		} else {
			return console.log( err );
		}
	});
	return response.send( add );
});
//Update an add
app.put( '/api/adds/:id', function( request, response ) {
		console.log( 'Updating add ' + request.body.title );
		return AddModel.findById( request.params.id, function( err, add ) {
		add.title = request.body.title;
		add.authorId = request.body.authorId;
		add.description = request.body.description;
		add.price = request.body.price;
		add.coverImagePath = request.body.coverImagePath;
		add.releaseDate = request.body.releaseDate;
		add.keywords = request.body.keywords; // NEW
		return add.save( function( err ) {
			if( !err ) {
				console.log( 'add updated' );
			} else {
				console.log( err );
			}
			return response.send( add );
		});
	});
});

//Delete an add
app.delete( '/api/adds/:id', function( request, response ) {
	console.log( 'Deleting add with id: ' + request.params.id );
	return AddModel.findById( request.params.id, function( err, add ) {
		return add.remove( function( err ) {
			if( !err ) {
				console.log( 'Add removed' );
				return response.send( '' );
			} else {
				console.log( err );
			}
		});
	});
});

app.post('/api/photos', function(req, res) {
	var responseServerPath = 'images/' + req.files.userPhoto.name;
 	var serverPath = 'site/images/' + req.files.userPhoto.name;
	console.log(req.files.userPhoto.path);
	require('fs').rename(
		req.files.userPhoto.path,
		serverPath,
		function(error) {
			if(error) {
				console.log(error);
				res.send({
					error: 'Ah crap! Something bad happened'
				});
				return;
			}
			 
			res.send({
				path: responseServerPath
			});
		}
	);
});