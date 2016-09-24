var map;

// var markers = [];

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: {lat: 55.953252, lng:-3.188267},
    zoom: 13
  });
  var locations = [
  {title:"Calton Hill", location{lat: 55.9553471, lng:-3.1825288}},
  {title:"Edinburgh Castle", location{lat: 55.9485947, lng:-3.1999135}},
  {title:"Arthur's Seat", location{lat: 55.9440833, lng:-3.1618333}},
  {title:"Scottish National Gallery of Modern Art", location{lat: 55.95143179999999, lng:-3.2254509}},
  {title:"National Museum of Scotland", location{lat: 55.94704, lng:-3.191668}},
  {title:"Grassmarket", location{lat: 55.9475383, lng:-3.1984856}},
  {title:"Scottish National Gallery", location{lat: 55.9509865, lng:-3.1986358}},
  {title:"Royal Botanic Garden Edinburgh", location{lat: 55.9512388, lng:-3.2331183}},
  {title:"Palace of Holyroodhouse", location{lat: 55.9465981, lng:-3.2095417}},
  {title:"Scott Monument", location{lat: 55.9513812, lng:-3.1986984}},
  ]
}