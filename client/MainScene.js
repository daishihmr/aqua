phina.define("aqua.client.MainScene", {
  superClass: "phina.display.CanvasScene",

  init: function() {
    var self = this;

    this.superInit({
      width: 960,
      height: 640
    });
    this.fromJSON({
      children: {
        threeLayer: {
          className: "phina.display.ThreeLayer",
          arguments: {
            width: 960,
            height: 640
          },
          visible: false,
        },
        hud: {
          className: "phina.display.CanvasElement",
          children: {
            cannonBase: {
              className: "phina.display.Sprite",
              arguments: ["ship"],
              x: 960 - 50,
              y: 640 - 120,
              rotation: -90,
              scaleX: 0.7,
              scaleY: 0.7,
              alpha: 0.8,
              children: {
                cannon0: {
                  className: "phina.display.Sprite",
                  arguments: ["cannon"],
                  x: 70,
                  scaleX: 0.35,
                  scaleY: 0.35
                },
                cannon1: {
                  className: "phina.display.Sprite",
                  arguments: ["cannon"],
                  x: 20,
                  scaleX: 0.35,
                  scaleY: 0.35
                },
                cannon2: {
                  className: "phina.display.Sprite",
                  arguments: ["cannon"],
                  x: -80,
                  scaleX: 0.35,
                  scaleY: 0.35,
                  rotation: 180
                },
              }
            }
          }
        }
      }
    });

    var scene = this.threeLayer.scene;

    // 太陽
    this.threeLayer.light.intensity = 0.2;
    this.threeLayer.light.position.x = -1;

    // 環境光
    scene.add(new THREE.AmbientLight(0x909090));

    // カメラ
    var camera = this.threeLayer.camera;
    camera.fov = 55;
    camera.near = 0.5;
    camera.far = 3000000;
    camera.needsUpdate = true;
    this.camera = aqua.client.ThreeElement(camera).addChildTo(this);
    var cameraTarget = new THREE.Object3D();
    scene.add(cameraTarget);
    this.camera.target = aqua.client.ThreeElement(cameraTarget).addChildTo(this.camera);

    this._setupWater(scene, camera);
    this._setupSkyBox(scene, camera);

    aqua.client.MyShip()
      .setCamera(camera)
      .setCannonHud(this.hud.cannonBase.cannon0, this.hud.cannonBase.cannon1, this.hud.cannonBase.cannon2)
      .addTo(scene)
      .addChildTo(this);

    (10).times(function() {
      var ship = aqua.client.Ship()
        .addTo(scene)
        .addChildTo(this);
      ship.x = Math.randint(-3000, 3000);
      ship.z = Math.randint(-3000, 3000);
      ship.rotY = Math.randfloat(0, 360).toRadian();
    }.bind(this));

    this.camera.tweener
      .set({
        x: 0,
        y: 300,
        z: 400
      });
    this.camera.target.tweener
      .set({
        x: 0,
        y: 0,
        z: -500
      });

    var last = phina.app.Element()
      .addChildTo(this)
      .on("enterframe", function(e) {
        // test.rotY += (0.25).toRadian();

        // _cannon0.rotation.y = (Math.sin(e.app.ticker.frame * 0.01) * 90).toRadian();
        // _cannon1.rotation.y = (Math.sin(e.app.ticker.frame * 0.01) * 90).toRadian();
        // _cannon2.rotation.y = (180 + Math.sin(e.app.ticker.frame * 0.01) * 90).toRadian();

        if (e.app.ticker.frame % 20 === 0) {
          aqua.client.Explosion(Math.randint(-1200, 1200), 50, Math.randint(-1200, 1200), 0.8)
            .addTo(scene)
            .addChildTo(self);
          aqua.client.Explosion(Math.randint(-1200, 1200), 50, Math.randint(-1200, 1200), 1.0)
            .addTo(scene)
            .addChildTo(self);
        }
      })
      .tweener
      .wait(100)
      .call(function() {
        self.threeLayer.visible = true;
      });
  },

  _setupWater: function(scene, camera) {
    var waterNormals = new THREE.Texture(phina.asset.AssetManager.get("image", "waternormals").domElement);
    waterNormals.needsUpdate = true;
    waterNormals.wrapS = THREE.RepeatWrapping;
    waterNormals.wrapT = THREE.RepeatWrapping;

    var water = new THREE.Water(this.threeLayer.renderer, camera, scene, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      sunDirection: this.threeLayer.light.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 50.0,
    });
    var mirrorMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2000 * 500, 2000 * 500),
      water.material
    );
    mirrorMesh.add(water);
    mirrorMesh.rotation.x = (-90).toRadian();
    scene.add(mirrorMesh);

    return aqua.client.ThreeElement(mirrorMesh)
      .addChildTo(this)
      .on("enterframe", function() {
        water.material.uniforms.time.value += 1.0 / 60.0;
        water.render();
      });
  },

  _setupSkyBox: function(scene, camera) {
    var self = this;

    var cubeMap = new THREE.CubeTexture([]);
    cubeMap.format = THREE.RGBFormat;

    var skyboxTexture = phina.asset.AssetManager.get("image", "skybox").domElement;

    var getSize = function(x, y) {
      var size = 1024;
      var canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      var context = canvas.getContext("2d");
      context.drawImage(skyboxTexture, -x * size, -y * size);
      return canvas;
    };
    cubeMap.images[0] = getSize(2, 1);
    cubeMap.images[1] = getSize(0, 1);
    cubeMap.images[2] = getSize(1, 0);
    cubeMap.images[3] = getSize(1, 2);
    cubeMap.images[4] = getSize(1, 1);
    cubeMap.images[5] = getSize(3, 1);
    cubeMap.needsUpdate = true;

    var cubeShader = THREE.ShaderLib["cube"];
    cubeShader.uniforms["tCube"].value = cubeMap;

    var skyBoxMaterial = new THREE.ShaderMaterial({
      fragmentShader: cubeShader.fragmentShader,
      vertexShader: cubeShader.vertexShader,
      uniforms: cubeShader.uniforms,
      depthWrite: false,
      side: THREE.BackSide
    });

    var skyBox = new THREE.Mesh(
      new THREE.BoxGeometry(10000, 10000, 10000),
      skyBoxMaterial
    );
    scene.add(skyBox);

    return aqua.client.ThreeElement(skyBox)
      .addChildTo(this)
      .on("enterframe", function() {
        skyBox.position.copy(camera.position);
      });
  },
  
  update: function() {
    
  }

});
