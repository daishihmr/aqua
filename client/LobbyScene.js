phina.define("aqua.client.LobbyScene", {
  superClass: "phina.display.CanvasScene",
  
  _eventBuffer: null,

  init: function() {
    this.superInit({
      backgroundColor: "black",
      width: 960,
      height: 640
    });
    this.fromJSON({
      _eventBuffer: [],
      children: {
        nameBox: {
          className: "aqua.client.TextBox",
          arguments: {
            hint: "名前を入力してください"
          },
          x: 480,
          y: 40
        }
      }
    });
    
    var socket = io.connect(SERVER_URL);
    socket.on("connect", function() {
      console.log("connect", this.id);
      this.emit("join", {
        name: "ゲスト"
      });
    });
    
    socket.on("welcome", function(params) {
      console.log(params);
    });

    this.tweener.wait(500).call(function() {
      socket.emit("startlogin");
    });

    socket.on("outh", function(params) {
      if (window.$on) {
        window.$on("callback", function(params) {
          socket.emit("callback", params);
          window.$clear("callback");
        });
      }
      window.open(params.url, "_blank", "width=800,height=600,menubar=no,location=yes,resizable=yes,scrollbars=yes,status=no");
    });
    
    socket.on("loginsuccess", function(params) {
      console.log(params.name);
      console.log(params.icon);
    });
  },
  
  onenter: function(ev) {
    
  },

});
