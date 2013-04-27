YUI().use('app', 'indexView', 'itemModel', 'flickrService', function (Y) {
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
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position);
        }, function(error){
            console.log(error);
        });

        this.showView('index');
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