phina.define("aqua.client.MainSceneSequence", {
  superClass: "phina.game.ManagerScene",
  
  init: function(socket) {
    this.superInit({
      scenes: [
      
        {
          className: "aqua.client.LoadingScene",
        },
      
        {
          label: "login",
          className: "aqua.client.LoginScene",
          arguments: {
            socket: socket
          },
          nextLabel: "lobby",
        },

        {
          label: "lobby",
          className: "aqua.client.LobbyScene",
          arguments: {
            socket: socket
          }
        },

        {
          label: "battle",
          className: "aqua.client.MainScene"
        },

      ]
    });
  }
});
