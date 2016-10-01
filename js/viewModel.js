
var ViewModel = function(){
  var self = this;
  self.places = ko.observableArray(markers);
  self.query = ko.observable("");
  self.search = ko.computed(function(){
    return ko.utils.arrayFilter(self.places(), function(place){
      return place.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
    });
  })
};

