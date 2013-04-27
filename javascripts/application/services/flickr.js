YUI.add('flickr-service', function (Y) {
    Y.FlickrService = function(options) {
        this.modelList = options.modelList;
        this.result    = {};
    };


    Y.FlickrService.prototype.fetch = function(latitude, longitude) {
        // XHR request here, cache result to this.result
    };
}, '0.0.1', {
    requires: []
});