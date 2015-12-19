var phina = require("./phina");
var config = require("../config.json");
var io = require("socket.io")(config.port);
var log = require("./Log")("MainScene");

require("./Ship");

phina.define("aqua.server.MainScene", {
  superClass: "phina.app.Scene",
  
  eventBuffer: null,
  
  init: function() {
    this.superInit();
    
    this.fromJSON({
      children: {
        ships: {
          className: "phina.app.Element",
        },
        bullets: {
          className: "phina.app.Element",
        },
      }
    });
    
    this.eventBuffer = [];

    var self = this;
    io.on("connection", function(socket) {
      log("on connect", socket.id);
      
      socket.on("join", function(params) {
        if (!params.id) return;
        self.eventBuffer.push(["join", params]);
      });

      socket.on("disconnect", function() {
        log("on disconnect", this.id);
        self.eventBuffer.push(["disconnect", { id: this.id }]);
      });
    });
  },

  update: function() {
    var self = this;
    this.eventBuffer.forEach(function(ev) {
      self.flare(ev[0], ev[1]);
    });
    this.eventBuffer.clear();
  },

  onjoin: function(params) {
    if (!this.ships.children.some(function(_){ return _.id == params.id })) {
      log("new ship coming");
      aqua.server.Ship(params.id)
        .addChildTo(this.ships);
    } else {
      log("ship reconnected", params.id);
    }
  },
  
  ondisconnect: function(params) {
    var self = this;
    var ship = this.ships.children.find(function(_){ return _.id == params.id });
    if (ship) ship.remove();
  }

});
