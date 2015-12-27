phina.define("aqua.client.Socket", {
  
  socket: null,
  callbackIndex: 0,

  init: function(socket) {
    this.socket = socket;
  },
  
  send: function(name, params) {
    params.callbackEventName = "callback-" + this.callbackIndex;
    this.callbackIndex += 1;

    return phina.util.Flow(function(resolve, reject) {
      this.socket.emit(name, params);
      this.socket.once(params.callbackEventName, function(response) {
        resolve(response);
      });
    });
  },
  
});
