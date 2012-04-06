$(function() {
    var Tweet = Backbone.Model.extend();
    
    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        url: 'http://search.twitter.com/search.json?q=NYC&callback=?',
        parse: function(response) {
            console.log('parsing ...')
            return response.results;
        }
    });
    var PageView = Backbone.View.extend({
        el: $('body'),
        events: {
            'click button#add': 'doSearch'
        },
        initialize: function() {
            _.bindAll(this, 'render', 'addItem');
            this.tweets = new Tweets();
            _this = this;
            this.tweets.bind('reset', function(collection) {
                _this.$('#tweets').empty();
                collection.each(function(tweet) {
                    _this.addItem(tweet);
                });
            });
            this.counter = 0;
            this.render();
        },
        doSearch: function() {
            var subject = $('#search').val() || 'NYC';
            this.tweets.url = 'http://search.twitter.com/search.json?q=' + subject + '&callback=?';
            this.tweets.fetch();
        },
        render: function() {
            $(this.el).append("<input id= 'search'type='text' placeholder='Write a word'></input>");
            $(this.el).append("<button id='add'>Search twitts</button>");
            $(this.el).append("<ul id='tweets'></ul>");
            return this;
        },
        addItem: function(item) {
            console.log(item);
            $('ul', this.el).append("<li><b>" + item.get('from_user_name') + "</b>:  " + item.get('text') + "</li>");
    
        }
    });
    var pageView = new PageView();
});