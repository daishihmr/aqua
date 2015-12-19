phina.define("aqua.client.MainSceneSequence", {
  superClass: "phina.game.ManagerScene",
  
  init: function() {
    this.superInit({
      scenes: [
      
        {
          className: "phina.game.LoadingScene",
          arguments: {
            lie: false,
            width: 960,
            height: 640,
            assets: {
              image: {
                "waternormals": "./assets/waternormals.jpg",
                "skybox": "./assets/skyboxsun25degtest.png",
                "ship": "./assets/ship0.png",
                "cannon": "./assets/ship1.png",
                "cannonRed": "./assets/ship1red.png",
              },
              vox: {
                "test": "./assets/chr_fox.vox",
                "ship": "./assets/ship.vox",
                "cannon": "./assets/ship_cannon.vox",
              }
            }
          }
        },
      
        {
          label: "main",
          className: "aqua.client.MainScene"
        }

      ]
    });
  }
});
