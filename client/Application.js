phina.define("aqua.client.Application", {
  superClass: "phina.display.CanvasApp",
  
  init: function() {
    this.superInit({
      width: 960,
      height: 640,
    });
    // this.fps = 60;
    this.replaceScene(aqua.client.MainSceneSequence());
    
    this.enableStats();
  }

});
