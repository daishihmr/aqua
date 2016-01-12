phina.namespace(function() {

  phina.define("aqua.client.Ship", {
    superClass: "aqua.client.ThreeElement",

    hp: 0,

    speed: 2.0,
    velocity: null,

    cameraPosition: null,
    cameraTarget: null,

    input: null,
    selectedCannon: 0,

    init: function() {
      this.superInit(new THREE.Object3D());

      this.hp = 10;
      this.cannonElevation = 0;

      phina.asset.AssetManager.get("vox", "ship").material.emissive = new THREE.Color(0.05, 0.05, 0.05);
      phina.asset.AssetManager.get("vox", "ship").material.specular = new THREE.Color(1.0, 1.0, 1.0);
      phina.asset.AssetManager.get("vox", "ship").material.shininess = 100;

      phina.asset.AssetManager.get("vox", "cannon").material.emissive = new THREE.Color(0.05, 0.05, 0.05);
      phina.asset.AssetManager.get("vox", "cannon").material.specular = new THREE.Color(1.0, 1.0, 1.0);
      phina.asset.AssetManager.get("vox", "cannon").material.shininess = 100;

      phina.asset.AssetManager.get("vox", "cannonBody").material.emissive = new THREE.Color(0.05, 0.05, 0.05);
      phina.asset.AssetManager.get("vox", "cannonBody").material.specular = new THREE.Color(1.0, 1.0, 1.0);
      phina.asset.AssetManager.get("vox", "cannonBody").material.shininess = 100;

      this.body = phina.asset.AssetManager.get("vox", "ship").clone();
      this.body.position.y = -20;
      this.body.scale.set(0.25, 0.25, 0.25);
      this.$t.add(this.body);

      this.cannon0 = phina.asset.AssetManager.get("vox", "cannon").clone();
      this.cannon0.position.set(0, 140, -320);
      this.cannon0.scale.set(0.5, 0.5, 0.5);
      this.body.add(this.cannon0);

      this.cannonBody0 = phina.asset.AssetManager.get("vox", "cannonBody").clone();
      this.cannonBody0.position.set(0, 100, 50);
      this.cannon0.add(this.cannonBody0);

      this.cannon1 = phina.asset.AssetManager.get("vox", "cannon").clone();
      this.cannon1.position.set(0, 170, -140);
      this.cannon1.scale.set(0.5, 0.5, 0.5);
      this.body.add(this.cannon1);

      this.cannonBody1 = phina.asset.AssetManager.get("vox", "cannonBody").clone();
      this.cannonBody1.position.set(0, 100, 50);
      this.cannon1.add(this.cannonBody1);

      this.cannon2 = phina.asset.AssetManager.get("vox", "cannon").clone();
      this.cannon2.position.set(0, 130, 360);
      this.cannon2.scale.set(0.5, 0.5, 0.5);
      this.cannon2.rotation.y = (180).toRadian();
      this.body.add(this.cannon2);

      this.cannonBody2 = phina.asset.AssetManager.get("vox", "cannonBody").clone();
      this.cannonBody2.position.set(0, 100, 50);
      this.cannon2.add(this.cannonBody2);

      this.cannons = [this.cannon0, this.cannon1, this.cannon2];
      this.cannonBodies = [this.cannonBody0, this.cannonBody1, this.cannonBody2];

      this.input = {
        "up": false,
        "down": false,
        "left": false,
        "right": false,
        "cannonRotation": 0,
        "cannonUp": false,
        "cannonDown": false,
        "cannon0": false,
        "cannon1": false,
        "cannon2": false,
        "space": false,
        "aim": false,
      };

      this.velocity = new THREE.Vector3(0, 0, 0);
      this.cameraPosition = new THREE.Vector3(0, 0, 0);
      this.cameraTarget = new THREE.Vector3(0, 0, 0);

      this.body.geometry.computeBoundingBox();
      this.boundingBox = this.body.geometry.boundingBox;
    },

    isHitPoint: function(point) {
      var local = this.body.worldToLocal(point.clone());
      return this.boundingBox.containsPoint(local);
    },

    setCamera: function(camera) {
      this.camera = camera;
      return this;
    },

    damage: function() {
      this.hp -= 1;
      if (this.hp <= 0) {
        this.remove();
      }
    },

    update: function(app) {
      // ゆれ
      this.body.rotation.z = (Math.sin(app.ticker.frame * 0.01) * 2).toRadian();

      if (this.input["up"]) {
        this.speed = Math.min(this.speed + 0.01, 3.0);
      } else if (this.input["down"]) {
        this.speed = Math.max(this.speed - 0.01, -3.0);
      }

      if (this.input["right"]) {
        this.rotation.y += (-0.1 * this.speed).toRadian();
      } else if (this.input["left"]) {
        this.rotation.y += (+0.1 * this.speed).toRadian();
      }

      if (this.input["cannon0"]) {
        this.selectedCannon = 0;
      } else if (this.input["cannon1"]) {
        this.selectedCannon = 1;
      } else if (this.input["cannon2"]) {
        this.selectedCannon = 2;
      }

      var selectedCannon = this.selectedCannon;
      if (selectedCannon == 2) {
        this.input["cannonRotation"] *= -1;
      }
      this.cannons[0].rotation.y = Math.clamp(this.cannons[0].rotation.y + this.input["cannonRotation"], (-110).toRadian(), (110).toRadian());
      this.cannons[1].rotation.y = Math.clamp(this.cannons[1].rotation.y + this.input["cannonRotation"], (-110).toRadian(), (110).toRadian());
      this.cannons[2].rotation.y = Math.clamp(this.cannons[2].rotation.y - this.input["cannonRotation"], (180 + -110).toRadian(), (180 + 110).toRadian());

      if (this.input["cannonUp"]) {
        this.cannonElevation = Math.min(this.cannonElevation + 0.002, (20).toRadian());
      } else if (this.input["cannonDown"]) {
        this.cannonElevation = Math.max(this.cannonElevation - 0.002, 0);
      }

      this.cannonBodies[0].rotation.x = this.cannonBodies[1].rotation.x = this.cannonBodies[2].rotation.x = this.cannonElevation;

      this.velocity.set(0, 0, -this.speed);
      this.velocity.applyQuaternion(this.quaternion);
      this.position.add(this.velocity);

      if (this.input["space"]) {
        var cannon = this.cannons[selectedCannon];

        for (var i = 0; i < 3; i++) {
          tempVector.set((-1 + i) * 150, 0, 0).applyMatrix4(cannon.matrixWorld);

          var bullet = aqua.client.Bullet(tempVector.x, tempVector.y, tempVector.z);
          bullet.rotation.order = "YXZ";
          bullet.rotation.x = this.cannonElevation + Math.randfloat(-1, 1).toRadian();
          bullet.rotation.y = cannon.rotation.y + this.rotation.y + Math.randfloat(-1, 1).toRadian();

          bullet.owner = this;

          this.flare("fire", {
            bullet: bullet
          });
        }

        tempVector.set(0, 0, -300).applyMatrix4(cannon.matrixWorld);
        aqua.client.Explosion(tempVector.x, tempVector.y, tempVector.z, 0.8)
          .addChildTo(this.parent);
      }

      if (this.camera) {
        var cannon = this.cannons[this.selectedCannon];

        if (this.input["aim"]) {
          this.camera.zoom = 2;
          tempVector
            .set(0, 200, 300)
        } else {
          this.camera.zoom = 1;
          tempVector
            .set(0, 1000, 3200)
        }
        this.camera.updateProjectionMatrix();

        tempVector
          .applyMatrix4(cannon.matrixWorld);
        this.camera.position.lerp(tempVector, 0.6);

        tempVector
          .set(0, 200, -4000)
          .applyMatrix4(cannon.matrixWorld);
        this.cameraTarget.lerp(tempVector, 0.6);
        this.camera.lookAt(this.cameraTarget);
      }
    }

  });

  var tempVector = new THREE.Vector3();

});
