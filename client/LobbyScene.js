phina.define("aqua.client.LobbyScene", {
  superClass: "phina.display.CanvasScene",

  _eventBuffer: null,

  socket: null,

  init: function(params) {
    var self = this;
    this.superInit({
      backgroundColor: "black",
      width: 960,
      height: 640
    });
    this.fromJSON({
      _eventBuffer: [],
      socket: params.socket,
      children: {
        layer0: {
          className: "phina.display.CanvasElement",
          children: {
            bg0: {
              className: "phina.display.Sprite",
              arguments: ["lobbyBg", 960, 640],
              originX: 0,
              originY: 0,
            },
            bg1: {
              className: "phina.display.RectangleShape",
              arguments: {
                width: 960,
                height: 640,
                fill: "hsla(240, 20%, 20%, 0.8)",
                stroke: null,
                padding: 0,
              },
              originX: 0,
              originY: 0,
            },
            titleLabel: {
              className: "phina.display.Label",
              arguments: {
                text: "lobby",
                fill: "rgb(200, 200, 200)",
                fontSize: 60,
                fontFamily: "main",
              },
              x: this.gridX.span(8),
              y: this.gridY.span(2),
            },
            sallyButton: {
              className: "phina.ui.Button",
              arguments: {
                text: "sally",
                width: 400,
                fontFamily: "main",
                fill: null,
                stroke: "white",
                strokeWidth: 1,
              },
              x: this.gridX.span(8),
              y: this.gridY.span(8),
              onadded: function() {
                this.tweener
                  .set({
                    scaleX: 1.2,
                    scaleY: 1.2,
                  })
                  .to({
                    scaleX: 1.0,
                    scaleY: 1.0,
                  }, 500, "easeOutBounce");
              },
              onpointover: function() {
                this.fill = "hsla(260, 20%, 60%, 0.8)";
              },
              onpointout: function() {
                this.fill = null;
              },
              onpush: function() {
                self.layer0.sallyButton.setInteractive(false);
                self.sally();
              }
            },
          },
        },
      }
    });
  },
  
  sally: function() {
    this.exit("battle");
  },

});
