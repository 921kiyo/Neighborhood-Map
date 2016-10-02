var map = new google.maps.Map(document.getElementById("map"), {
  center: {lat: 55.953252, lng:-3.188267},
  zoom: 14,
  mapTypeControlOptions:{
    mapTypeIds:["roadmap", "satellite"]
  }
});

var locations = [
{
 title:"Calton Hill",
 location:{lat: 55.9553471, lng:-3.1825288},
 placeid: "4b058820f964a52047b322e3" // id for FourSquare
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
