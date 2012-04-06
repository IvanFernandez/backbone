(function($) {

	var Tweet = Backbone.Model.extend({
		defaults: {
			order: 0,
			name: 'No name',
			info: 'No info'
		}
	});

	//TODO: interfaz sencillita para que en vez de a Obama se pueda buscar cualquier persona.
	var Tweets = Backbone.Collection.extend({
		//url: 'http://search.twitter.com/search.json?q=twitter&callback=?',
		url: '/otro',
		parse: function(response) {
			return response.results;
		}
	});

	//TODO: meter algo de Pusher, Node.js ó Websockets para que en vez de coger un 
	var PageView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},
		initialize: function() {
			_.bindAll(this, 'render', 'addItem', 'appendItem');
			this.tweets = new Tweets();
			this.tweets.fetch();
			this.tweets.bind('add', this.appendItem); // collection event binder
			this.counter = 0;
			this.render();
		},
		render: function() {
			//TOSEE: algo de html5 quizá ??.
			$(this.el).append("<input id= 'search'type='text' placeholder='Write a word'></input>");
			$(this.el).append("<button id='add'>Search twitts</button>");
			$(this.el).append("<ul id='tweets'></ul>");
			return this;
		},
		addItem: function(item) {
			// doing ...

			/*var r = function checkEventIDClass(id) {
					var my_temp_var;
					$.ajax({
						url: 'http://localhost:8080/otro',
						async: false,
						success: function(result) {
							my_temp_var = result;
							$(this.el).append("success 1 " + result);

						},
						error: function(error) {
							$(this.el).append("error 1 : " + error);
						}
					});
					return my_temp_var;
				}
			var rr = r();
			alert(JSON.stringify(rr));
			$(this.el).append(JSON.stringify(rr));


			var r = function checkEventIDClass2(id) {
					var my_temp_var;
					$.ajax({
						url: 'http://localhost:8080/stream',
						async: false,
						success: function(result) {
							my_temp_var = result;
							$(this.el).append("success 2 " + result);

						},
						error: function(error) {
							$(this.el).append(error);
							my_temp_var = error;
							$(this.el).append("error 2 : " + error);

						}
					});
					return my_temp_var;
				}
			var rr = r();
			var tweet_list = $("#tweets");
			$.each(rr, function() {
				console.log(this);
				console.log(rr);
				$("<li>").html(this.text).prependTo(tweet_list);
			});*/


			var tweet_list = $("#tweets");

			function load_tweets() {
				$.getJSON("http://localhost:8080/stream", function(tweets) {
					$('body').append(new Date());
					$.each(tweets, function() {
						$("<li>").html(this.text).prependTo(tweet_list);
					});
					load_tweets();
				});
			}

			setTimeout(load_tweets, 3000);




			/*var res = $.ajax({
				// setup the server address
				url: 'http://localhost:8080/otro',
				success: function(response) {
				// on success
					return res;
				},
				error: function() {
					// on error
				}
			});
			alert(res);
			$(this.el).append("" +JSON.stringify(res));*/


			var tweets = this.tweets.fetch().models;
			var item = new Tweet();
			item.set({
				order: this.counter,
				info: tweets[this.counter].attributes.text // modify item defaults
				//info: tweets2[this.counter].attributes.text // modify item defaults
			});
			console.log(item.get('info'));
			//this.counter++;
			this.tweets.add(item);
		},

		appendItem: function(item) {
			$('ul', this.el).append("<li>" + item.get('order') + " " + item.get('info') + "</li>");
		}
	});
	var pageView = new PageView();
})(jQuery);
