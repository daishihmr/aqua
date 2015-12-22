var phina = require("./libs/phina");
var THREE = require("./libs/three");

phina.define("aqua.server.Object3D", {
  superClass: "phina.app.Element",
  
  $t: null,
  
  init: function() {
    this.superInit();
    this.fromJSON({
      $t: new THREE.Object3D()
    });
  }

});
