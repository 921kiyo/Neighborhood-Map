
var ViewModel = function(){
  var self = this;
  this.placeList = ko.observableArray([]);
  console.log(markers);
  for (var i = 0; i<markers.length; i++){
    self.placeList.push(markers[i].title);
    console.log(markers[i].title);
    
  }

};

ko.applyBindings(new ViewModel());
