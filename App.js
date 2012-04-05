(function($) {

	var Tweet = Backbone.Model.extend({
		defaults: {
			order: 0,
			name: 'No name',
			info: 'No info'
		}
	});

	var Tweets = Backbone.Collection.extend({
		url: 'http://search.twitter.com/search.json?q=obama&callback=?',
		parse: function(response) {
			return response.results;
		}
	});

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
			$(this.el).append("<button id='add'>Search twitts</button>");
			$(this.el).append("<ul></ul>");
			return this;
		},
		addItem: function(item) {
			var tweets = this.tweets.fetch().models;
			var item = new Tweet();
			item.set({
				order: this.counter,
				info: tweets[this.counter].attributes.text // modify item defaults
			});
			this.counter++;
			this.tweets.add(item); 
		},
		appendItem: function(item) {
			$('ul', this.el).append("<li>" + item.get('order') + " " + item.get('info') + "</li>");
		}
	});
	var pageView = new PageView();
})(jQuery);
