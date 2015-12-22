var log = require("./Log")("Application");
var phina = require("./libs/phina");
require("./Lobby");
require("./User");

phina.define("aqua.server.Application", {
  superClass: "phina.app.BaseApp",
  
  _eventBuffer: null,
  
  users: null,

  init: function(io) {
    this.superInit();

    this._eventBuffer = [];    
    this.users = [];

    var self = this;
    io.on("connection", function(socket) {
      log("on connect", socket.id);

      socket.on("join", function(params) {
        self._eventBuffer.push(["join", {
          socket: this,
          name: params.name,
        }]);
      });

      socket.on("disconnect", function() {
        log("on disconnect", this.id);
        self._eventBuffer.push(["disconnect", {
          id: this.id
        }]);
      });
    });

    this.replaceScene(aqua.server.Lobby());
  },

  update: function() {
    var self = this;
    this._eventBuffer.forEach(function(ev) {
      self.flare(ev[0], ev[1]);
    });
    this._eventBuffer.clear();
  },

  onjoin: function(params) {
    var self = this;
    var user = this.users.find(function(_) {
      return _.id == params.id
    });

    if (!user) {
      log("new user coming");
      user = aqua.server.User(params.socket, params.name);
      this.users.push(user);
      
      user.socket.emit("welcome");
      
      self.currentScene.addUser(user);
    } else {
      log("user reconnected", params.id);
      user.socket = params.socket;
    }
  },

  ondisconnect: function(params) {
    var self = this;
    var user = this.users.find(function(_) {
      return _.id == params.id
    });
    if (user) {
      this.users.erase(user);
    }
  },

});
