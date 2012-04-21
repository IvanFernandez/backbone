$(function() {
    var Tweet = Backbone.Model.extend();
    var Loc = Backbone.Model.extend();
        var User = Backbone.Model.extend();

    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        url: 'http://search.twitter.com/search.json?q=Node.js&rpp=8&callback=?',
        parse: function(response) {
            //console.log('parsing tweets...')
            console.log(response.results);
            return response.results;
        }
    });

    var _Location = Backbone.Collection.extend({
        model: Loc,
        url: 'http://where.yahooapis.com/v1/places.q("Spain")?format=json&appid=[foOF4CzV34EFIIW4gz1lx0Ze1em._w1An3QyivRalpXCK9sIXT5de810JWold3ApkdMdCrc-%22]',
        parse: function(response) {
            //console.log('parsing location ...')
            return response.places.place;
        }
    });

    var User = Backbone.Collection.extend({
        model: User,
        url: 'https://api.twitter.com/1/users/show.json?user_id=007&callback=?',
        parse: function(response) {
            //console.log('parsing user ...');
            return response;
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
                console.log('tttt');
                console.log(collection);
                _this.$('#tweets').empty();
                collection.each(function(tweet) {
                    console.log(tweet);
                    _this.addItem(tweet);
                });
                $('#spinner').hide();
            });

            this.map = new L.Map('map');
            var cloudmade = new L.TileLayer('http://{s}.tile.cloudmade.com/[600a3a04a61c426e865a90ec8fae7237]/997/256/{z}/{x}/{y}.png');
            var center = new L.LatLng(25,0);
            this.map.setView(center, 1).addLayer(cloudmade);
            this.render();
        },
        doSearch: function() {
            $('#spinner').show();
            var subject = $('#search').val() || 'Node.js';
            this.tweets.url = 'http://search.twitter.com/search.json?q=' + subject + '&rpp=8&callback=?';
            this.tweets.fetch();
        },
        render: function() {
            $('#spinner').hide();
            return this;
        },
        addItem: function(item) {
            _this = this;
            var user_id = item.get("from_user_id");
            this.user = new User();
            this.user.url = 'https://api.twitter.com/1/users/show.json?user_id=' + user_id + '&callback=?'
            this.user.fetch();
            this.user.bind('reset',function(collection){
                collection.each(function(value) {
                    var location = value.get("location");
                    this.loc = new _Location();
                    this.loc.url = 'http://where.yahooapis.com/v1/places.q('+ location + ')?format=json&appid=[foOF4CzV34EFIIW4gz1lx0Ze1em._w1An3QyivRalpXCK9sIXT5de810JWold3ApkdMdCrc-%22]',
                    this.loc.fetch();
                    this.loc.bind('reset', function(collection) {
                        collection.each(function(value) {
                            var centroid = value.get("centroid")
                            var circleLocation = new L.LatLng(centroid.latitude, centroid.longitude),
                            circleOptions = {
                                color: 'red',
                                fillColor: '#f03',
                                fillOpacity: 0.2
                            };
                            var circle = new L.Circle(circleLocation, 1500, circleOptions);
                            _this.map.addLayer(circle);
                        });
                    });
                });
            });
            var img = "<img class='tweeter_photo' src='" + item.get('profile_image_url') + "' />"
            $('ul', this.el).append("<li>" + img + "<b>" + item.get('from_user_name') + "</b>:<br />  " + item.get('text') + "</li>");

        }
    });
    var pageView = new PageView();
});
