/*Backbone.sync = function(method, model, success, error){ 
 	//Access-Control-Allow-Origin: "http://localhost"
 }



var Event = Backbone.Model.extend({

  defaults: {
  	name : "Default Name",
  	info : "Default Info"
  },

  initialize: function() {

  },

  author: function() {},

  coordinates: function() {},

  allowedToEdit: function(account) {
    return true;
  }

});

var Events = Backbone.Collection.extend({
  url: 'http://api.eventful.com/rest/events/search?app_key=gGZgS7gdjk2nnXKr&location=Madrid',
  parse: function(response) {
    return response.events;
  }
});

var PrivateNote = Event.extend({

  allowedToEdit: function(account) {
    return account.owns(this);
  }

});

var note = new Event({name : "Another Name", info : "Another Info"});
var note2 = new Event();
var pnote = new PrivateNote();
var events = new Events();
events.fetch();*/

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
			//console.log(this.tweets);
			//console.log(this.tweets.models[this.counter].attributes.text);
			var item = new Tweet();
			item.set({
				order: this.counter,
				info: tweets[this.counter].attributes.text // modify item defaults
			});
			this.counter++;

			this.tweets.add(item); // add item to collection; view is updated via event 'add'
		},
		appendItem: function(item) {
			$('ul', this.el).append("<li>" + item.get('order') + " " + item.get('info') + "</li>");
		}
	});


	//var tweets = new Tweets();
	var pageView = new PageView();


	//tweets.bind('reset', function(collection) {
	//   alert(collection.length);
	//});
	//tweets.fetch();
})(jQuery);
