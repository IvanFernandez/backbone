(function() {
  var http, multipart, varname;

  http = require('http');

  multipart = require('multipart');

  varname = true;

  http.createServer(function(req, res) {
    var str;
    str = 'Hello World!!';
    res.writeHead(200);
    if (varname != null) res.write('Second ');
    if (true) return res.end(str);
  }).listen(4000);

  /*
  http.get '/photos/new' , (req, res) ->
  	res.render '/photos/new'
  */

}).call(this);
