var port = (process.env.VMC_APP_PORT || process.env.PORT || 3000);
//var host = (process.env.VCAP_APP_HOST || 'localhost');

var express = require('express'),
    sys = require("sys"),
    multipart = require('multipart'),
    //redis = require("redis"),
    sio = require("socket.io");


//var client = redis.createClient();
var redis = require('redis-url').connect(process.env.REDISTOGO_URL);


/*client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("string key", "string val", redis.print);*/

//var app = express.createServer();
var app = express();

app.configure(function() {
	//app.use(express.logger());
	app.use(express.static(__dirname + '/static'));
})

/*app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});*/
//var port = process.env.PORT || 3000;
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.render('index');
	//client.sadd('aaa', new Date());
	/*client.set("string key", "string val", function(redis){
		console.log("Redis " + redis)
	});*/
});

/*app.get('/photos/new', function(req, res) {
	console.log('PETICION ...')
    res.render('photos/new');
  });
*/

app.listen(port, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});


var io = sio.listen(app)
  , nicknames = {};


// assuming io is the Socket.IO server object
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


var user = 0;
io.sockets.on('connection', function (socket) {
  user = user + 1;
  socket.user = user;
  socket.emit('user', user);
  redis.sadd('users', user);
  //client.sadd('users', user);
  //var usersss = client.multi().smembers('users').exec(function (err, replies) {
  var usersss = redis.multi().smembers('users').exec(function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
        });
        io.sockets.emit('nusers', replies[0].length, replies[0].toString());
        //socket.broadcast.emit('nusers', user);
  });
  socket.on('disconnect', function () {
    redis.srem('users',socket.user);
    redis.multi().smembers('users').exec(function (err, replies) {
  	//client.srem('users',socket.user);
  	//client.multi().smembers('users').exec(function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
        });
        io.sockets.emit('nusers', replies[0].length, replies[0].toString());
        //socket.broadcast.emit('nusers', user);
  	});
  });
  /*var users = client.smembers('users', function(value){
  	console.log("VALUES " + value);
  });*/
  //console.log("USERS: " + redis.print);
  //console.log("VALUES " +  values)
  });

//app.listen(port,null);
//sys.puts("Server running at http://localhost:" + port + "/");




