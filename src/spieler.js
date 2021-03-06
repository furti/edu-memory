(function(angular) {
  "use strict";

  function zufallszahl(minimum, maximum) {
    return Math.round(Math.random() * (maximum - minimum)) + minimum;
  }

  angular.module('memory')
    .factory('spieler', function() {
      return {
        /**
         * Mischt die Karten im stapel.
         * Die Karten im Stapel sind von Beginn an fein säuberlich sortiert.
         * Das heißt die beiden zueinandergehörigen Karten liegen nebeneinander.
         *
         * Das ist ja langweilig wenn man genau weiß wo die richtige Karte liegt.
         * Also mische was das Zeug hält damit es ein spannendes Spiel wird.
         *
         * @param  {[type]} kartenstapel Der Kartenstapel bietet folgende Funktionen an.
         *                               kartenZaehlen(): Zählt die Karten im Stapel und gibt die Anzahl der Karten zurück.
         *                               tauscheKarten(stelle1, stelle2): Tauscht die Karte an Stelle 1 mit der Karte an Stelle 2.
         */
        mische: function(kartenstapel) {
          var kartenanzahl = kartenstapel.zaehleKarten();

          for (var anzahlVertauschungen = 0; anzahlVertauschungen < 100; anzahlVertauschungen++) {
            var ersteKartenNummer = zufallszahl(1, kartenanzahl);
            var zweiteKartenNummer = zufallszahl(1, kartenanzahl);

            var ersteKarte = kartenstapel.tauscheKarten(ersteKartenNummer, zweiteKartenNummer);
          }
        },

        /**
         * Hier wird geprüft, ob genug Karten Aufgedeckt sind um sie miteinander zu vergleichen.
         *
         * Wie das beim Memory ist die Anzahl der benötigten Karten für einen Versuch ja nicht schwer zu erraten ;)
         *
         * @param  {number} anzahlAufgedeckterKarten Die Anzahl der Aufgedeckten Karten.
         * @return {boolean}                         true wenn genügend Karten aufgedeckt sind. Sonst false.
         */
        genugKartenAufgedeckt: function(anzahlAufgedeckterKarten) {
          return anzahlAufgedeckterKarten === 2;
        },

        /**
         * Vergleicht zwei Karten miteinander.
         * Diese Funktion wird aufgerufen wenn zwei Karten aufgeschlagen wurden.
         *
         *	Jede karte bietet das Feld "name". Es gibt immer zwei Karten mit dem gleichen Namen.
         *
         * @param  {[type]} karte1 Die erste Karte.
         * @param  {[type]} karte2 Die zweite Karte.
         * @return {boolean}        true wenn beide Karten gleich sind. Ansonsten false.
         */
        vergleiche: function(karte1, karte2) {
          return karte1.name === karte2.name;
        },

        /**
         * Diese Funktion wird aufgerufen wenn zwei Karten aufgedeckt wurden, die aber nicht zusammenpassen.
         *
         * Jede karte hat die eigenschaft offen die angibt, ob die Karte offen oder verdeckt am Feld liegt.
         * Wenn offen = true --> Karte liegt offen am Feld.
         * Wenn offen = false --> Karte liegt verdeckt am Feld.
         *
         * @param  {[type]} karte1 Die erste aufgedeckte Karte.
         * @param  {[type]} karte2 Die zweite aufgedeckte Karte.
         */
        kartenPassenNicht: function(karte1, karte2) {
          karte1.offen = false;
          karte2.offen = false;
        },

        /**
         * Berechnet die Punkte die der Spieler für das finden eines Paares bekommt.
         *
         * @param  {number} versuche        Die Anzahl der Versuche die der Spieler für das finden des Paares benötigt hat.
         * @param  {number} gefundenePaare  Die Anzahl der Paare die der Spieler bereits gefunden hat.
         * @return {number}                 Die Punkte die der Spieler bekommt.
         */
        berechnePunkte: function(versuche, gefundenePaare) {
          if (versuche === 1) {
            return 100;
          }

          var punkte = 100 - (versuche * gefundenePaare * 10);

          if (punkte < 10) {
            return 10;
          }

          return punkte;
        },

        /**
         * Diese Funktion wird aufgerufen um zu prüfen, ob alle Kartenpaare gefunden wurden.
         * @param  {number} gefundenePaare Die Anzahl der bereits gefundenen Kartenpaare.
         * @param  {number} anzahlKarten   Die Anzahl der Karten die insgesamt am Feld liegen.
         * @return {boolean}                true wenn alle Kartenpaare gefunden wurden. Sonst false.
         */
        wurdeAllesGefunden: function(gefundenePaare, anzahlKarten) {
          return gefundenePaare === anzahlKarten / 2;
        },

        /**
         * Die Funktion wird aufgerufen wenn alle Kartenpaare gefunden wurden um den Glückwunschtext für den Spieler zu generieren.
         *
         * @param  {number} punkte          Die Anzahl der Punkte die der Spieler erreicht hat.
         * @param  {number} gefundenePaare  Die Anzahl der Paare die der Spieler gefunden hat.
         * @return {string}                 Der Glückwunschtext der dem Spieler angezeigt wird.
         */
        glueckwunsch: function(punkte, gefundenePaare) {
          return 'Glückwunsch. Du hast ' + punkte + ' von ' + (gefundenePaare * 100) + ' Punkte erreicht!!! :)';
        }
      };
    });
})(angular);
