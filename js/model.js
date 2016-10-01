var map;

// all the markers of the locations will be in this array
var markers = [];
// Create
var placeMarkers = [];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 55.953252, lng:-3.188267},
    zoom: 14,
    mapTypeControlOptions:{
      mapTypeIds:["roadmap", "satellite"]
    }
  });
  console.log("here1");

  var searchBox = new google.maps.places.SearchBox(
    document.getElementById("places-search"));
  searchBox.setBounds(map.getBounds());
  // var searchAutocomplete = new google.maps.places.Autocomplete(document.getElementById("XXX"));

  // // Bias the boundaries within the map
  // searchAutocomplete.bindTo("bounds", map);

  var locations = [
  {
   title:"Calton Hill",
   location:{lat: 55.9553471, lng:-3.1825288},
   placeid: "4b058820f964a52047b322e3"
  },
  {
   title:"Edinburgh Castle",
   location:{lat: 55.9485947, lng:-3.1999135},
   placeid: "4aa37fb3f964a520f64320e3"
  },
  {
    title:"Arthur's Seat",
    location:{lat: 55.9440833, lng:-3.1618333},
    placeid: "4b05881ff964a5203eb322e3"
  },
  {
   title:"Scottish National Gallery of Modern Art (Modern One)",
   location:{lat: 55.950924, lng:-3.22784},
   placeid: "4b058820f964a5207eb322e3"
  },
  {
   title:"National Museum of Scotland", 
   location:{lat: 55.94704, lng:-3.191668},
   placeid: "4b090909f964a520fd1323e3"
  },
  {
   title:"Grassmarket",
   location:{lat: 55.9475383, lng:-3.1984856},
   placeid: "4b2bfaedf964a520f1be24e3"
  },
  {
   title:"Scottish National Gallery",
   location:{lat: 55.9509865, lng:-3.1986358},
   placeid: "4b058820f964a5207fb322e3"
  },
  {
   title:"Royal Botanic Garden Edinburgh", 
   location:{lat: 55.9512388, lng:-3.2331183},
   placeid: "4b05881ff964a52039b322e3"
  },
  {
   title:"Palace of Holyroodhouse", 
   location:{lat: 55.9465981, lng:-3.2095417},
   placeid: "4b05881ff964a52037b322e3"
  },
  {
   title:"The Scott Monument", 
   location:{lat: 55.9513812, lng:-3.1986984},
   placeid: "4b058820f964a52055b322e3"
  }
  ];

  // var styles = [{}]

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  var defaultIcon = makeMarkerIcon("0091ff");
  var highlightedIcon = makeMarkerIcon("FFFF24");

  function hideMarkers(markers){
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  }
  function makeMarkerIcon(markerColor){
    var markerImage = new google.maps.MarkerImage(
      "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" + markerColor + "|40|_|%E2%80%A2",
      new google.maps.Size(21,34),
      new google.maps.Point(0,0),
      new google.maps.Size(10,34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  for(var i = 0; i< locations.length; i++){
    var position = locations[i].location;
    var title = locations[i].title;
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      icon: defaultIcon,
      placeid: locations[i].placeid, // FourSquare Api
      animation: google.maps.Animation.DROP,
      id: i // why do I need id??
    });
    console.log(marker.title)
    console.log(marker.icon)
    markers.push(marker);
    bounds.extend(marker.position); //???

    addFourSquareApi(marker);

    marker.addListener("click", function(){
      populateInfoWindow(this, largeInfowindow);
    });
    marker.addListener("mouseover", function(){
      console.log("over")
      console.log(this.setIcon)
      this.setIcon(highlightedIcon);
    })
    marker.addListener("mouseout", function(){
      this.setIcon(defaultIcon);
    })
  }

  // Adding FourSquare Api info to a marker          
  function addFourSquareApi(marker){
    $.ajax({
      url: "https://api.foursquare.com/v2/venues/" + marker.placeid + "?client_id=OORBF4RAFGJKSOH5IODZIVOTDJIV0UYFHRUVG4QMGRC2VSDW&client_secret=CG0TQESP2AMWJL1OLUSPPVX4ACESCVJ50SATZVUIPJAJZLW3&v=20140806",
      dataType:"json",
      success: function(data){
        console.log("success");
        var result = data.response.venue;
        marker.photo = result.hasOwnProperty("bestPhoto")? result.bestPhoto.prefix + "300x300" + result.bestPhoto.suffix: "";
        marker.likes = result.hasOwnProperty("likes")? result.likes.summary: "";
        marker.rating = result.hasOwnProperty("rating")? result.rating: ""; 
      },
      error: function(error){
        console.log(error);
      }
    });
  }

  function populateInfoWindow(marker, infowindow){
    if(infowindow.marker != marker){
      largeInfowindow.marker = marker;
      infowindow.setContent("<div>" + marker.title + "</div>");
      infowindow.setContent("<div>" + marker.likes + "</div>");
      infowindow.setContent("<div>" + marker.ratings + "</div>");
      infowindow.setContent("<img src=" + marker.photo + " />");
      infowindow.open(map, marker);

      infowindow.addListener("closeclick", function(){
        infowindow.setMarker(null);
      });

      // get panorama image based on the closest location of the marker
    //   var streetViewService = new google.maps.StreetViewService();
    //   // image within 50m of the markers position
    //   var radius = 50;

    //   function getStreetView(data, status){
    //     if(status == google.maps.StreetViewStatus.OK){
    //       var nearStreetViewLocation = data.location.latLng;
    //       var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
    //       infowindow.setContent("<div>" + marker.title + "</div><div id='pano'></div>");

    //       // setting the view as if you are looking "at" the location here
    //       var panoramaOptions = {
    //         position: nearStreetViewLocation,
    //         pov: {
    //           heading: heading,
    //           pitch: 30
    //         }
    //       };
    //       // create panorama object and putting it inside the infowindow
    //       var panorama = new google.maps.StreetViewPanorama(
    //         document.getElementById("pano"), panoramaOptions);
    //     }else{
    //       infowindow.setContent("<div>" + marker.title + "</div>" + 
    //         "<div>No Street View Found</div>" );
    //     }
    //   }

    //   streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView); 
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
  // immediately show when open the browser
  showListings();

  function hideListings(){
    for(var i = 0; i< markers.length; i++){
      markers[i].setMap(null);
    }
  }

  function zoomToArea(){
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("zoom-to-area-text").value;

    if(address == ""){
      window.alert("Please enter an area or address.");
    }else{
      geocoder.geocode(
      {
        address: address,
        componentRestrictions: {locality: "Edinburgh"}
      }, function(results, status){
        if(status == google.maps.GeocoderStatus.OK){
          map.setCenter(results[0].geometry.location);
          map.setZoom(17);
        }else{
          /// TODO: need to fix here
          window.alert("Sorry, the location could not be found - Please try a more specific place");
        }
      });
    }
  }

  function searchBoxPlaces(searchBox){
    hideMarkers(placeMarkers);
    var places = searchBox.getPlaces();

    createMarkersForPlaces(places);
    if(places.length == 0){
      window.alert("No matching place found");
    }
  }

  function textSearchPlaces(){
    var bounds = map.getBounds();
    hideMarkers(placeMarkers);
    var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
      query: document.getElementById("places-search").value,
      bounds: bounds
    }, function(results, status){
      if (status === google.maps.places.PlacesServiceStatus.OK){
        createMarkersForPlaces(results);
      }
    });
  }

  function createMarkersForPlaces(places){
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < places.length; i++){
      var place = places[i];
      var icon = {
        url: place.icon,
        size: new google.maps.Size(35,35),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Size(15,34),
        scaledSize: new google.maps.Size(25,25)
      };

      var marker = new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location,
        id: place.id
      });
      
      var placeInfoWindow = new google.maps.InfoWindow();
      marker.addListener("click", function(){
        if(placeInfoWindow.marker == this){
          console.log("Already exist");
        }else{
          getPlacesDetails(this, placeInfoWindow); // "this" is marker
        }
      });
    }
  }

  document.getElementById("show-listings").addEventListener("click", showListings);
  document.getElementById("hide-listings").addEventListener("click", hideListings);

  document.getElementById("zoom-to-area").addEventListener("click", function(){
    zoomToArea();
  });

  // Fired when the user selects a predicted results from the list
  searchBox.addListener("places_changed", function(){
    searchBoxPlaces(this);
  });
  // Fired then go button is clicked
  document.getElementById("go-places").addEventListener("click", textSearchPlaces);
  // ViewModel.js gets executed after markers have been created
  ko.applyBindings(new ViewModel());
}

