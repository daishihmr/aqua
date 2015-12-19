var phina = require("./phina");
require("./MainScene");
var log = require("./Log")("Application");

phina.define("aqua.server.Application", {
  superClass: "phina.app.BaseApp",
  
  init: function() {
    this.superInit();
    this.replaceScene(aqua.server.MainScene());
  }

});
