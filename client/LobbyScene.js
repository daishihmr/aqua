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
              className: "aqua.client.Button",
              arguments: {
                text: "sally",
              },
              x: this.gridX.span(8),
              y: this.gridY.span(8),
              onclick: function() {
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
