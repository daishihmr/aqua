phina.define("aqua.client.LoginScene", {
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
                text: "please login",
                fill: "rgb(200, 200, 200)",
                fontSize: 60,
                fontFamily: "main",
              },
              x: this.gridX.span(8),
              y: this.gridY.span(2),
            },
            loginWithTwitterButton: {
              className: "aqua.client.Button",
              arguments: {
                text: "login with Twitter",
              },
              x: this.gridX.span(4),
              y: this.gridY.span(8),
              onclick: function() {
                self.layer0.loginWithTwitterButton.setInteractive(false);
                self.layer0.loginAsGuestButton.setInteractive(false);
                self.loginWithTwitter();
              }
            },
            orLabel: {
              className: "phina.display.Label",
              arguments: {
                text: "or",
                fill: "rgb(200, 200, 200)",
                fontFamily: "main",
              },
              x: this.gridX.span(8),
              y: this.gridY.span(8),
            },
            loginAsGuestButton: {
              className: "aqua.client.Button",
              arguments: {
                text: "login as Guest",
              },
              x: this.gridX.span(12),
              y: this.gridY.span(8),
              onclick: function() {
                self.layer0.loginWithTwitterButton.setInteractive(false);
                self.layer0.loginAsGuestButton.setInteractive(false);
                self.loginAsGuest();
              }
            },
          },
        },
      }
    });

    this.socket.on("LoginSucceeded", function(params) {
      self.layer0.tweener
      .fadeOut(500)
        .call(function() {
          self.exit();
        });
    });
  },

  loginWithTwitter: function() {
    this.socket.emit("StartLogin");
  },

  loginAsGuest: function() {
    this.socket.on("Outh", function(params) {
      if (!window.$oncallback) {
        window.$oncallback = function(params) {
          self.socket.emit("CalledBack", params);
          delete window.$oncallback;
        };
      }
      window.open(params.url, "_blank", "width=800,height=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no");
    });

    this.socket.emit("LoginWithGuest");
  }

});
