http = require 'http'
multipart = require 'multipart'

varname = true
http.createServer (req, res) ->
	str = 'Hello World!!'    
	res.writeHead 200
	res.write 'Second ' if varname?
	res.end	str if true
.listen 4000

###
http.get '/photos/new' , (req, res) ->
	res.render '/photos/new'
###
