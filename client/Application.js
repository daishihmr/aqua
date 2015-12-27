phina.define("aqua.client.Application", {
  superClass: "phina.display.CanvasApp",
  
  init: function() {
    this.superInit({
      width: 960,
      height: 640,
    });
    // this.fps = 60;
    this.backgroundColor = "black";

    var socket = io(SERVER_URL);
    socket.on("connect", function() {
      console.log("on connect", this.id);
      this.emit("Join");
    });
    
    this.replaceScene(aqua.client.MainSceneSequence(socket));
    
    this.enableStats();
  }

});
