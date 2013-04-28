YUI.add('flickr-service', function (Y) {
    Y.FlickrService = function(options) {
        this.modelList = options.modelList;
        this.apikey = '37ef7d8f26016c4639118a8127d18b2b';
    };

    Y.FlickrService.prototype.createUrl = function(farmId, secret, serverId, id) {
        return "http://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + "_z.jpg";
    };

	Y.FlickrService.prototype.fetch2 = function(latitude, longitude) {

        var query = "select * from geo.placefinder where text='" + latitude + "," + longitude + "' and gflags='R' "; 

        Y.log("query " + query);

        var that = this;
        var promise = new Y.Promise(function (fulfill) {
            Y.YQL(query, function(e) {
                var r = e.query.results;

                var result = r.Result;
                
                var line1 = result.line1;
                var line2 = result.line2;
                var city = result.city;
                var postal = result.postal;
                var county = result.county;
                var state = result.state;
                var country = result.country;
                var zip  = result.uzip;
                var state = result.state;
                
                var locationString = '';
                if (line1) {
                	locationString = (line1 + ',');
                };
                if (line2) {
                	locationString += (line2 + ','); 
                }
                if (state) {
                	locationString += (country + ',');
                };
                if (county) {
                	locationString += (county + ',');
                };
                if(country) {
                	locationString += (country + ',');
                }
                
                if (locationString.indexOf(locationString.length - 1) == ',') {
                	locationString = locationString.substring(0, locationString.length - 2);	
                };
                
                Y.log(locationString);
                var expediaUrl = "http://api.ean.com/ean-services/rs/hotel/v3/geoSearch?cid=55505&apiKey=trrjvhjnhg4wpyqenmfquptt&type=2&destinationString="
                					+ locationString;
                					
                Y.log(expediaUrl);
                
                var transaction = YAHOO.util.Connect.asyncRequest('GET', expediaUrl, that.callback, null);
                
                
            });
        });

        return promise;
    };
    
    Y.FlickrService.prototype.responseSuccess = function(o){ 
        Y.log(10);
    }
    
    Y.FlickrService.prototype.responseFailure = function(o){ 
        Y.log("XMLHTTPRequest Failure");
    }
    
    Y.FlickrService.prototype.callback = function() {
    	// success:responseSuccess,
        // failure:responseFailure	
        Y.log(callback);
    }

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