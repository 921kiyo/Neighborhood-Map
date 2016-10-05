var map;

var largeInfowindow;
var defaultIcon;
var highlightedIcon;
// all the markers of the locations will be in this array
var markers = [];

function initMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.953252, lng:-3.188267},
    zoom: 14,
    mapTypeControlOptions:{
      mapTypeIds:['roadmap', 'satellite']
    }
  });

  var locations = [
  {
   title:'Calton Hill',
   location:{lat: 55.9553471, lng:-3.1825288},
   placeid: '4b058820f964a52047b322e3'
  },
  {
   title:'Edinburgh Castle',
   location:{lat: 55.9485947, lng:-3.1999135},
   placeid: '4aa37fb3f964a520f64320e3'
  },
  {
    title:'Arthur\'s Seat',
    location:{lat: 55.9440833, lng:-3.1618333},
    placeid: '4b05881ff964a5203eb322e3'
  },
  {
   title:'Scottish National Gallery of Modern Art (Modern One)',
   location:{lat: 55.950924, lng:-3.22784},
   placeid: '4b058820f964a5207eb322e3'
  },
  {
   title:'National Museum of Scotland', 
   location:{lat: 55.94704, lng:-3.191668},
   placeid: '4b090909f964a520fd1323e3'
  },
  {
   title:'Grassmarket',
   location:{lat: 55.9475383, lng:-3.1984856},
   placeid: '4b2bfaedf964a520f1be24e3'
  },
  {
   title:'Scottish National Gallery',
   location:{lat: 55.9509865, lng:-3.1986358},
   placeid: '4b058820f964a5207fb322e3'
  },
  {
   title:'Royal Botanic Garden Edinburgh', 
   location:{lat: 55.9512388, lng:-3.2331183},
   placeid: '4b05881ff964a52039b322e3'
  },
  {
   title:'Palace of Holyroodhouse', 
   location:{lat: 55.9465981, lng:-3.2095417},
   placeid: '4b05881ff964a52037b322e3'
  },
  {
   title:'The Scott Monument', 
   location:{lat: 55.9513812, lng:-3.1986984},
   placeid: '4b058820f964a52055b322e3'
  }
  ];

  largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  defaultIcon = makeMarkerIcon('0091ff');
  highlightedIcon = makeMarkerIcon('FFFF24');

  function hideMarkers(markers){
    for(var i = 0; i < markers.length; i++){
      markers[i].setMap(null);
    }
  }
  function makeMarkerIcon(markerColor){
    var markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor + '|40|_|%E2%80%A2',
      new google.maps.Size(21,34),
      new google.maps.Point(0,0),
      new google.maps.Point(10,34),
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
      id: i, 
      map: map
    });
    
    markers.push(marker);
    bounds.extend(marker.position); //???

    addFourSquareApi(marker);

    marker.addListener('click', function(){
      populateInfoWindow(this, largeInfowindow);
    });
    // marker.addListener('mouseover', function(){
    //   this.setIcon(highlightedIcon);
    // });
    // marker.addListener('mouseout', function(){
    //   this.setIcon(defaultIcon);
    // });
  }

  // Adding FourSquare Api info to a marker          
  function addFourSquareApi(marker){
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/' + marker.placeid + '?client_id=OORBF4RAFGJKSOH5IODZIVOTDJIV0UYFHRUVG4QMGRC2VSDW&client_secret=CG0TQESP2AMWJL1OLUSPPVX4ACESCVJ50SATZVUIPJAJZLW3&v=20140806',
      dataType:'json',
      success: function(data){
        console.log('success');
        var result = data.response.venue;
        marker.photo = result.hasOwnProperty('bestPhoto')? result.bestPhoto.prefix + '200x200' + result.bestPhoto.suffix: '';
        marker.likes = result.hasOwnProperty('likes')? result.likes.summary: '';
        marker.rating = result.hasOwnProperty('rating')? result.rating: ''; 
        marker.url = result.hasOwnProperty('url')? result.url: ''; 
        marker.phone = result.contact.hasOwnProperty('formattedPhone')? result.contact.formattedPhone: ''; 
        if (result.location.hasOwnProperty('formattedAddress')){
          marker.address =[];
          for(var i = 0; i < result.location.formattedAddress.length; i++){
            marker.address = marker.address + result.location.formattedAddress.shift() + ' ';
          }
        }
      },
      error: function(error){
        var errorInfowindow = new google.maps.InfoWindow();
        errorInfowindow.marker = marker;
        errorInfowindow.setContent("<div><p>Sorry something went wrong..</p></div>")
        errorInfowindow.open(map, marker);
      }
    });
  }

  // open the list view menu
  var navMenu = document.getElementById('menu-button');
  navMenu.addEventListener('click', function(e){
    var optionBox = document.getElementsByClassName('option-box');
    optionBox.drawer.classList.toggle('open');
    e.stopPropagation();
  });

  // close the list view menu
  var mapMenu = document.getElementById('map');
  mapMenu.addEventListener('click', function(){
    var optionBox = document.getElementsByClassName('option-box');
        optionBox[0].className = 'option-box';
  });

  // var foo = document.getElementsByClassName('list-view');
  // foo.addListener('mouseover', function(){
  //   console.log('some');
  // }); 

  ko.applyBindings(new ViewModel());
}

function showListings(){
  var bounds = new google.maps.LatLngBounds();
  for(var i = 0; i< markers.length; i++){
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  window.onresize = function(){
    map.fitBounds(bounds);
  }
  
}

function hideListings(){
  for(var i = 0; i< markers.length; i++){
    markers[i].setMap(null);
  }
}

function populateInfoWindow(marker, infowindow){
  if(infowindow.marker != marker){
    largeInfowindow.marker = marker;
    var contentString = '<div class="infowindow"><h3>' + '<a href=' + marker.url + '>'                  + marker.title + '</a></h3>' + 
                        '<img id="infowindow-image" src=' + marker.photo + ' /><br/>'+ 
                        '<p>Phone: ' + marker.phone + '</p>' +   
                        '<p>Address: ' + marker.address + '</p>' + 
                        '<p>' + 'Rating: ' + marker.rating + '/10, ' + marker.likes + '</p>' + '</div>';
    infowindow.setContent(contentString);
    // change the color of marker
    marker.setIcon(highlightedIcon);
    // adjust the center and open the infowindow
    map.panTo(marker.position);
    infowindow.open(map, marker);

    infowindow.addListener('closeclick', function(){
      marker.setIcon(defaultIcon);
    });
  }
}

function googleMapErrorHandler(){
  alert('Google map did not load correctly. Please try it again')
}

