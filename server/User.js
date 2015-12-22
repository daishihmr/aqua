var phina = require("./libs/phina");

phina.define("aqua.server.User", {
  superClass: "phina.app.Element",

  _eventBuffer: null,

  id: null,
  socket: null,
  name: null,
  twitterId: null,
  icon: null,
  auth: null,

  handler: null,

  init: function(socket, name) {
    this.superInit();

    this._eventBuffer = [];

    this.id = socket.id;
    this.socket = socket;
    this.name = name;

    this.handle("startlogin");
    this.handle("callback");
  },

  handle: function(eventType) {
    var self = this;
    this.socket.on(eventType, function(params) {
      params = params || {};
      params.user = self;
      self._eventBuffer.push([eventType, params]);
    });
  },

  update: function() {
    var handler = this.handler;
    if (handler) {
      this._eventBuffer.forEach(function(ev) {
        handler.flare(ev[0], ev[1]);
      });
    }
    this._eventBuffer.clear();
  }

});
