phina.define("aqua.client.LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function() {
    this.superInit({
      lie: false,
      width: 960,
      height: 640,
      assets: {
        font: {
          "main": "./assets/BreeSerif-Regular.ttf",
        },
        image: {
          "waternormals": "./assets/waternormals.jpg",
          "skybox": "./assets/skybox.png",
          "ship": "./assets/ship0.png",
          "cannon": "./assets/ship1.png",
          "cannonRed": "./assets/ship1red.png",
          "lobbyBg": "./assets/lobby_bg.png",
        },
        vox: {
          "test": "./assets/chr_fox.vox",
          "ship": "./assets/ship.vox",
          "cannon": "./assets/ship_cannon.vox",
          "cannonBody": "./assets/ship_cannon_body.vox",
          "bullet": "./assets/bullet.vox",
          "splash": "./assets/splash.vox",
        }
      }
    });
  }

});
