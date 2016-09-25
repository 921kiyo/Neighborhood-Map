
var ViewModel = function(){
  var self = this;
  var title = [];
  console.log(this.placeList);
  for (var i = 0; i<markers.length; i++){
    title.push({"title": markers[i].title});
    console.log(markers[i].title);
    console.log(title);
  }
  this.placeList = ko.observableArray(title);
};

