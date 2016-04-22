(function(angular) {
  "use strict";

  function Kartenstapel() {
    this.karten = [];
  }

  Kartenstapel.prototype.zaehleKarten = function() {
    return this.karten.length;
  };

  Kartenstapel.prototype.tauscheKarten = function(stelle1, stelle2) {
    stelle1 -= 1;
    stelle2 -= 1;

    if (!this.gueltigeStelle(stelle1) || !this.gueltigeStelle(stelle2)) {
      return;
    }

    var tmp = this.karten[stelle1];

    this.karten[stelle1] = this.karten[stelle2];
    this.karten[stelle2] = tmp;
  };

  Kartenstapel.prototype.gueltigeStelle = function(stelle) {
    return stelle >= 0 && stelle < this.karten.length;
  };

  function karteRegistrieren(stapel, icon) {
    var iconPath = './icons/' + icon;
    var name = icon.substring(0, icon.indexOf('.'));

    stapel.karten.push({
      name: name,
      bild: iconPath,
      offen: false
    });

    stapel.karten.push({
      name: name,
      bild: iconPath,
      offen: false
    });
  }

  angular.module('memory')
    .factory('kartenstapel', function() {
      var kartenstapel = new Kartenstapel();

      karteRegistrieren(kartenstapel, 'face.svg');
      karteRegistrieren(kartenstapel, 'favorite.svg');
      karteRegistrieren(kartenstapel, 'pets.svg');
      karteRegistrieren(kartenstapel, 'rowing.svg');
      karteRegistrieren(kartenstapel, 'shoppingcart.svg');
      karteRegistrieren(kartenstapel, 'thumb.svg');

      return kartenstapel;
    });
})(angular);
