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
  },
  
  setHandler: function(handler) {
    if (this.handler == null && this.handler != handler) {
      this._eventBuffer.clear();
    }
    this.handler = handler;
    return this;
  },

  handle: function(eventType) {
    var self = this;
    this.socket.on(eventType, function(params) {
      params = params || {};
      params.user = self;
      self._eventBuffer.push([eventType, params]);
    });
    return this;
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
