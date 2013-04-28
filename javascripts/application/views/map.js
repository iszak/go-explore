YUI.add('map-view', function (Y) {
    Y.IndexView = Y.Base.create('mapView', Y.View, [], {

    });
    
    Y.FlickrService.prototype.drawRoute = function(lat1, long1, lat2, long2) {

		
		var lineCoordinates = [
		  new google.maps.LatLng(lat1, long1),
		  new google.maps.LatLng(lat2, long2)
		];
		
		var lineSymbol = {
		  path: 'M 0,-1 0,1',
		  strokeOpacity: 1,
		  scale: 4
		};
		
		var line = new google.maps.Polyline({
		  path: lineCoordinates,
		  strokeOpacity: 0,
		  icons: [{
		    icon: lineSymbol,
		    offset: '0',
		    repeat: '20px'
		  }],
		  map: map
		});
		
		

	  line.setMap(map);
		
	    Y.log('here');
	}
    
    
    
}, '0.0.1', {
    requires: ['view']
});