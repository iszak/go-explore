YUI().use('app', 'index-view', 'item-model', 'item-list', 'flickr-service', function (Y) {
    var app = new Y.App({
        serverRouting: false,

        views: {
            index: {type: 'IndexView'},
            explore: {type: 'ExploreView'},
            detail: {type: 'DetailView'},
            map: {type: 'MapView'}
        }
    });


    app.route('/', function (req) {
        var modelList = new Y.ItemList();

        var flickr = new Y.FlickrService({
            modelList: modelList
        });


        // Fetch location
        navigator.geolocation.getCurrentPosition(function(position) {
            flickr.fetch(position.coords.latitude, position.coords.longitude, {
                maximumAge: 0,
                enableHighAccuracy: true
            });
        }, function(error) {
            console.log(error);
        });


        this.showView('index', {
            modelList: modelList
        });
    });


    app.route('/explore', function (req) {
        this.showView('explore');
    });


    app.route('/detail/:id', function (req) {
        this.showView('detail');
    });


    app.route('/map/:id', function (req) {
        this.showView('map');
    });


    app.render().save('/');
});