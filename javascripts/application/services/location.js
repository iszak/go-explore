YUI.add('location-service', function (Y) {
    Y.LocationService = function(options) {
        // TODO: Lazy load
        this.adapters = {
            'flickr': new Y.FlickrService({
                modelList: options.modelList
            })
        };

        this.location = {};

        // Calculate distance of new models
        this.modelList = options.modelList;
        this.modelList.after('add', Y.bind(this.calculateDistance, this));

        // Set adapters
        this.setAdapter(options.adapter);
    };



    Y.LocationService.prototype.setAdapter = function(adapter) {
        if (this.adapters[adapter]) {
            this.adapter = this.adapters[adapter];
        } else {
            throw new Error('Invalid adapter type');
        }
    };



    Y.LocationService.prototype.getAdapter = function() {
        if (this.adapter === undefined) {
            throw new Error('Adapter not defined');
        }

        return this.adapter;
    };



    Y.LocationService.prototype.calculateDistance = function(event) {
        var model = event.model;

        var modelLatitude = model.get('latitude');
        var modelLongitude = model.get('longitude');

        var currentLatitude = this.location.latitude;
        var currentLongitude = this.location.longitude;

        model.set('distance', 343);
    };



    Y.LocationService.prototype.fetch = function(position) {
        this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        this.getAdapter().fetch(position.coords.latitude, position.coords.longitude);
    };
}, '0.0.1', {
    requires: ['flickr-service']
});