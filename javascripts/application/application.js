YUI().use('app', 'index-view', 'explore-view', 'detail-view', 'item-model', 'item-list', 'location-service', function (Y) {
    var modelList = new Y.ItemList();


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
        this.showView('index');
    });


    app.route('/explore', function (req) {
        var location = new Y.LocationService({
            modelList: modelList,
            adapter: 'flickr'
        });


        // Poll location
        navigator.geolocation.watchPosition(Y.bind(location.fetch, location), function(error){
            console.log(error);
        }, {
            timeout: 10000,
            maximumAge: 0,
            enableHighAccuracy: true
        });

        this.showView('explore' , {
            modelList: modelList
        });
    });



    app.route('/detail/:id', function (req) {
        var model = modelList.getById(req.params.id);

        if (model === undefined) {
            // TODO:
        } else {
            this.showView('detail', {
                model: model
            });
        }
    });



    app.route('/map/:id', function (req) {
        this.showView('map');
    });



    app.render().save('/');
});