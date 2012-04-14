var port = (process.env.VMC_APP_PORT || process.env.PORT || 3000);
//var host = (process.env.VCAP_APP_HOST || 'localhost');

var express = require('express'),
    sys = require("sys"),
    multipart = require('multipart'),
    redis = require("redis");

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
//var port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.render('index');
});

app.get('/photos/new', function(req, res) {
	console.log('PETICION ...')
    res.render('photos/new');
  });

app.listen(port,null);
sys.puts("Server running at http://localhost:" + port + "/");




