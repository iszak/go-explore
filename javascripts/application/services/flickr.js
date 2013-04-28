YUI.add('flickr-service', function (Y) {
    Y.FlickrService = function(options) {
        this.modelList = options.modelList;
        this.apikey = '37ef7d8f26016c4639118a8127d18b2b';
    };

    Y.FlickrService.prototype.createUrl = function(farmId, secret, serverId, id) {
        return "http://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + "_z.jpg";
    };

    Y.FlickrService.prototype.fetch = function(latitude, longitude) {

        var query = "select * from flickr.photos.info where photo_id in (select id from flickr.photos.search(10)" +
                    "where lat='" + latitude + "'" + " and lon='" + longitude + "' and accuracy='1' and api_key='" + this.apikey + "')" +
                    " and api_key='" + this.apikey + "'";

        Y.log("query " + query);


        var that = this;
        var promise = new Y.Promise(function (fulfill) {
            Y.YQL(query, function(e) {
                var r = e.query.results;

                var photos = r.photo;
                photos.forEach(function(node,index) {
                    var photo = photos[index];

                    that.modelList.add({
                        'id': photo.id,
                        'title': photo.title,
                        'description': photo.description,
                        'latitude': photo.location.latitude,
                        'longitude': photo.location.longitude,
                        'url': that.createUrl(photo.farm, photo.secret, photo.server, photo.id)
                    });
                });

                fulfill(that.modelList);
            });
        });

        return promise;
    };
}, '0.0.1', {
    requires: ['yql', 'promise']
});