(function(angular) {
  "use strict";

  function MemoryController(kartenstapel, spieler, $timeout) {
    this.kartenstapel = kartenstapel;
    this.spieler = spieler;
    this.$timeout = $timeout;

    this.spieler.mische(this.kartenstapel);
    this.offeneKarten = [];
    this.versuche = 0;
  }

  MemoryController.prototype.karteWenden = function(karte) {
    if (karte.offen || this.offeneKarten.length === 2) {
      return;
    }

    karte.offen = true;
    this.offeneKarten.push(karte);

    if (this.offeneKarten.length === 2) {
      this.versuche++;
      var memory = this;

      //Wir müssen hier etwas warten ansonsten ist die Animation für das Aufschlagen noch nicht fertig wenn wir prüfen
      //und der Spieler sieht die zweite Karte nie.
      this.$timeout(function() {
        if (memory.spieler.vergleiche(memory.offeneKarten[0], memory.offeneKarten[1])) {

          memory.versuche = 0;
        } else {
          memory.offeneKarten[0].offen = false;
          memory.offeneKarten[1].offen = false;
        }

        memory.offeneKarten.length = 0;
      }, 1000);
    }
  };

  angular.module('memory', [])
    .component('memory', {
      templateUrl: './templates/memory.html',
      controller: MemoryController
    });
})(angular);
