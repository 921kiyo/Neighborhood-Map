var map;

// var markers = [];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    // center: {lat: 55.953252, lng:-3.188267},
    center: {lat: 40.7413549, lng: -73.9980244},
    zoom: 13
  });
  console.log(map);
}