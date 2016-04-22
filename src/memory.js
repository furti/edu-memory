(function(angular) {
  "use strict";

  function MemoryController(kartenstapel, spieler) {
    this.kartenstapel = kartenstapel;
    this.spieler = spieler;

    this.spieler.mische(this.kartenstapel);
  }

  MemoryController.prototype.karteWenden = function(karte) {
    karte.offen = !karte.offen;
  };

  angular.module('memory', [])
    .component('memory', {
      templateUrl: './templates/memory.html',
      controller: MemoryController
    });
})(angular);
