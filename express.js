var express = require('express');

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

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//app.set('view options', {layout: false});

//app.set('view options', {layout: true, locals: { scripts: ['no.js'] }});

app.get('/', function(req,res){
	/*res.render(__dirname + '/views/' + 'root', {
		scripts: ['no.js']
	});*/
	res.render('root');
});

app.listen(3000);



