phina.define("aqua.client.User", {
  superClass: "phina.app.Element",
  
  _eventBuffer: null,

  id: null,
  socket: null,
  name: null,
  twitterId: null,
  icon: null,
  auth: null,

  handler: null,

  init: function(socket) {
    this.superInit();
    this.fromJSON({
      _eventBuffer: [],
      id: socket.id,
      socket: socket,
    });
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
