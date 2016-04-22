(function(angular) {
  "use strict";

  function KarteController() {

  }

  angular.module('memory')
    .component('karte', {
      templateUrl: './templates/karte.html',
      controller: KarteController,
      bindings: {
        daten: '<'
      }
    });
})(angular);
