var ViewModel = function(){
  var self = this;

  this.placeList = ko.observableArray([]);


};

ko.applyBindings(new ViewModel());

module.exports = ViewModel