var map;

var markers = [];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 55.953252, lng:-3.188267},
    zoom: 14,
    mapTypeControlOptions:{
      mapTypeIds:["roadmap", "satellite"]
    }
  });
  var locations = [
  {title:"Calton Hill", location:{lat: 55.9553471, lng:-3.1825288}},
  {title:"Edinburgh Castle", location:{lat: 55.9485947, lng:-3.1999135}},
  {title:"Arthur's Seat", location:{lat: 55.9440833, lng:-3.1618333}},
  {title:"Scottish National Gallery of Modern Art", location:{lat: 55.95143179999999, lng:-3.2254509}},
  {title:"National Museum of Scotland", location:{lat: 55.94704, lng:-3.191668}},
  {title:"Grassmarket", location:{lat: 55.9475383, lng:-3.1984856}},
  {title:"Scottish National Gallery", location:{lat: 55.9509865, lng:-3.1986358}},
  {title:"Royal Botanic Garden Edinburgh", location:{lat: 55.9512388, lng:-3.2331183}},
  {title:"Palace of Holyroodhouse", location:{lat: 55.9465981, lng:-3.2095417}},
  {title:"Scott Monument", location:{lat: 55.9513812, lng:-3.1986984}},
  ];

  // var styles = [{}]

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // var defaultIcon = makeMarkerIcon("0091ff");
  // var highlightedIcon = makeMarkerIcon("FFFF24");

  function makeMarkerIcon(markerColor){
    var markerImage = new google.maps.MarkerImage(
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" + markerColor + "|40|_|%E2%80%A2",
      new google.maps.Size(21,34),
      new google.maps.Point(0,0),
      new google.maps.Size(10,34),
      new google.maps.Size(21,34));
    return markerImage;
    console.log(markerImage);
  }

  for(var i = 0; i< locations.length; i++){
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      // icon: defaultIcon,
      animation: google.maps.Animation.DROP,
      id: i // why do I need id??
    });
    markers.push(marker);
    bounds.extend(marker.position); //???

    marker.addListener("click", function(){
      populateInfoWindow(this, largeInfowindow);
    });

    // marker.addListener("mouseover", function(){
    //   this.setIcon(highlightedIcon);
    // })
    // marker.addListener("mouseout", function(){
    //   this.setIcon(defaultIcon);
    // })
  }

  function populateInfoWindow(marker, infowindow){
    if(infowindow.marker != marker){
      largeInfowindow.marker = marker;
      infowindow.setContent("<div>" + marker.title + "</div>");
      infowindow.open(map, marker);

      infowindow.addListener("closeclick", function(){
        infowindow.setMarker(null);
      });
      // get panorama image based on the closest location of the marker
      var streetViewService = new google.maps.StreetViewService();
      // image within 50m of the markers position
      var radius = 50;

      function getStreetView(data, status){
        if(status == google.maps.StreetViewStatus.OK){
          var nearStreetViewLocation = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
          infowindow.setContent("<div>" + marker.title + "</div><div id='pano'></div>");

          // setting the view as if you are looking "at" the location here
          var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
              heading: heading,
              pitch: 30
            }
          };
          // create panorama object and putting it inside the infowindow
          var panorama = new google.maps.StreetViewPanorama(
            document.getElementById("pano"), panoramaOptions);
        }else{
          infowindow.setContent("<div>" + marker.title + "</div>" + 
            "<div>No Street View Found</div>" );
        }
      }

      streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
    }
  }

  function showListings(){
    var bounds = new google.maps.LatLngBounds();
    for(var i = 0; i< markers.length; i++){
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
  }

  document.getElementById("show-listings").addEventListener("click", showListings);
}