
var ViewModel = function(){
  var self = this;
  var title = [];
  for (var i = 0; i<markers.length; i++){
    title.push({"title": markers[i].title});
  } 
  this.placeList = ko.observableArray(title);
};

