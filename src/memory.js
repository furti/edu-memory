(function(angular) {
  "use strict";

  function MemoryController(kartenstapelFabrik, spieler, $timeout) {
    this.spieler = spieler;
    this.$timeout = $timeout;
    this.kartenstapelFabrik = kartenstapelFabrik;

    this.start();
  }

  MemoryController.prototype.start = function() {
    this.kartenstapel = this.kartenstapelFabrik.neu();
    this.spieler.mische(this.kartenstapel);
    this.offeneKarten = [];
    this.gefundenePaare = 0;
    this.versuche = 0;
    this.punkte = 0;

    this.fertig = false;
    this.glueckwunsch = '';
  };

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
          memory.gefundenePaare += 1;
          memory.punkte += memory.spieler.berechnePunkte(memory.versuche, memory.gefundenePaare);

          memory.versuche = 0;
        } else {
          memory.offeneKarten[0].offen = false;
          memory.offeneKarten[1].offen = false;
        }

        memory.offeneKarten.length = 0;

        if (memory.spieler.wurdeAllesGefunden(memory.gefundenePaare, memory.kartenstapel.zaehleKarten())) {
          memory.fertig = true;
          memory.glueckwunsch = memory.spieler.glueckwunsch(memory.punkte, memory.gefundenePaare);
        }
      }, 1000);
    }
  };

  angular.module('memory', [])
    .component('memory', {
      templateUrl: './templates/memory.html',
      controller: MemoryController
    });
})(angular);
