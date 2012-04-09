var express = require('express'),
    sys = require("sys"),
    multipart = require('multipart');

var app = express.createServer();

app.configure(function() {
	app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
})

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});
var port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('view options', {layout: false});

//app.set('view options', {layout: true, locals: { scripts: ['no.js'] }});

app.get('/', function(req,res){
	/*res.render(__dirname + '/views', {
		scripts: ['/static/js/App.js']
	});*/
	res.render('index');
});

app.get('/photos/new', function(req, res) {
	console.log('PETICION ...')
    res.render('photos/new');
  });

app.listen(port);
sys.puts("Server running at http://localhost:" + port + "/");




