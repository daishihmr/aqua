phina.define("aqua.client.StantAloneSequence", {
  superClass: "phina.game.ManagerScene",
  
  init: function(socket) {
    this.superInit({
      scenes: [
      
        {
          className: "aqua.client.LoadingScene",
        },
      
        {
          label: "battle",
          className: "aqua.client.MainScene"
        },

      ]
    });
  }
});
