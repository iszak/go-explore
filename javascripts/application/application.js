YUI().use('app', 'index-view', 'item-model', 'item-list', 'location-service', function (Y) {
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

        var location = new Y.LocationService({
            modelList: modelList,
            adapter: 'flickr'
        });


        // Poll location
        navigator.geolocation.watchPosition(Y.bind(location.fetch, location), function(error){

        }, {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: true
        });


        setTimeout(function(){
            modelList.add({
                id: 1,
                latitude: -31.953004,
                longitude: 115.857469
            });
        }, 1000);


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