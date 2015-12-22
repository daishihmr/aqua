phina.define("aqua.client.Application", {
  superClass: "phina.display.CanvasApp",
  
  init: function() {
    this.superInit({
      width: 960,
      height: 640,
    });
    // this.fps = 60;

    this.socket = io.connect(SERVER_URL);

    this.replaceScene(aqua.client.MainSceneSequence());
    
    this.enableStats();
  }

});
