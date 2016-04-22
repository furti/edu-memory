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
        }
      };
    });
})(angular);