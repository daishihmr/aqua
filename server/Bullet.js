var phina = require("./libs/phina");

require("./Object3D");

phina.define("aqua.server.Bullet", {
  superClass: "aqua.server.Object3D",
  
  init: function() {
    this.superInit();
  }
});
