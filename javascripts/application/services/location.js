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
        this.modelList.after('reset', Y.bind(this.calculateAllDistances, this));
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



    Y.LocationService.prototype.calculateAllDistances = function(event) {
        event.models.forEach(Y.bind(function(model, index){
            this.calculateDistance(model);
        }, this));
    };


    Y.LocationService.prototype.calculateDistance = function(event) {
        var model;
        if (event.model) {
            model = event.model;
        } else if (event.name === 'model') {
            model = event;
        } else {
            throw Error('No model provided');
        }

        var modelLatitude = model.get('latitude');
        var modelLongitude = model.get('longitude');

        var currentLatitude = this.location.latitude;
        var currentLongitude = this.location.longitude;


        var radius = 6371; // Earth's radius in kilometers
        var latitude = this.deg2rad(modelLatitude - currentLatitude);
        var longitude = this.deg2rad(modelLongitude - currentLongitude);
        var a =
            Math.sin(latitude / 2) * Math.sin(latitude / 2) +
            Math.cos(this.deg2rad(currentLatitude)) * Math.cos(this.deg2rad(modelLatitude)) *
            Math.sin(longitude / 2) * Math.sin(longitude / 2)
        ;
        var angle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = radius * angle;

        model.set('distance', distance);
    };


    Y.LocationService.prototype.deg2rad = function(deg) {
        return deg * (Math.PI / 180);
    };


    Y.LocationService.prototype.fetch = function(position) {
        this.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        this.getAdapter().fetch(position.coords.latitude, position.coords.longitude).then(function(modelList){

        });
    };
}, '0.0.1', {
    requires: ['flickr-service']
});