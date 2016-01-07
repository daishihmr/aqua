phina.namespace(function() {

  phina.define("aqua.client.Ship", {
    superClass: "aqua.client.ThreeElement",

    speed: 0,
    velocity: null,

    cameraPosition: null,
    cameraTarget: null,

    input: null,
    selectedCannon: 0,

    init: function() {
      this.superInit(new THREE.Object3D());

      this.body = phina.asset.AssetManager.get("vox", "ship").get();
      this.$t.add(this.body);
      this.body.position.y = -20;
      this.body.scale.set(0.25, 0.25, 0.25);

      this.cannon0 = phina.asset.AssetManager.get("vox", "cannon").get();
      this.body.add(this.cannon0);
      this.cannon0.position.set(0, 140, -320);
      this.cannon0.scale.set(0.5, 0.5, 0.5);

      this.cannon1 = phina.asset.AssetManager.get("vox", "cannon").get();
      this.body.add(this.cannon1);
      this.cannon1.position.set(0, 170, -140);
      this.cannon1.scale.set(0.5, 0.5, 0.5);

      this.cannon2 = phina.asset.AssetManager.get("vox", "cannon").get();
      this.body.add(this.cannon2);
      this.cannon2.position.set(0, 130, 360);
      this.cannon2.scale.set(0.5, 0.5, 0.5);
      this.cannon2.rotation.y = (180).toRadian();

      this.cannons = [this.cannon0, this.cannon1, this.cannon2];

      this.input = {
        "up": false,
        "down": false,
        "left": false,
        "right": false,
        "cannonSelectUp": false,
        "cannonSelectDown": false,
        "cannonRotation": 0,
        "space": false,
      };

      this.velocity = new THREE.Vector3(0, 0, 0);
      this.cameraPosition = new THREE.Vector3(0, 0, 0);
      this.cameraTarget = new THREE.Vector3(0, 0, 0);
    },

    setCamera: function(camera) {
      this.camera = camera;
      return this;
    },

    update: function(app) {
      // ゆれ
      this.body.rotation.z = (Math.sin(app.ticker.frame * 0.02) * 5).toRadian();

      if (this.input["up"]) {
        this.speed = Math.min(this.speed + 0.01, 5.0);
      } else if (this.input["down"]) {
        this.speed = Math.max(this.speed - 0.01, -2.0);
      } else {
        this.speed *= 0.999;
      }

      if (this.input["right"]) {
        this.$t.rotation.y += (-0.1 * this.speed).toRadian();
      } else if (this.input["left"]) {
        this.$t.rotation.y += (+0.1 * this.speed).toRadian();
      }

      if (this.selectedCannon == 2) {
        this.input["cannonRotation"] *= -1;
      }
      this.cannon0.rotation.y = Math.clamp(this.cannon0.rotation.y + this.input["cannonRotation"], (-110).toRadian(), (110).toRadian());
      this.cannon1.rotation.y = Math.clamp(this.cannon1.rotation.y + this.input["cannonRotation"], (-110).toRadian(), (110).toRadian());
      this.cannon2.rotation.y = Math.clamp(this.cannon2.rotation.y - this.input["cannonRotation"], (180 + -110).toRadian(), (180 + 110).toRadian());

      if (this.input["cannonSelectUp"]) {
        this.selectedCannon = (this.selectedCannon + 3 - 1) % 3;
      } else if (this.input["cannonSelectDown"]) {
        this.selectedCannon = (this.selectedCannon + 3 + 1) % 3;
      }

      this.velocity.set(0, 0, -this.speed);
      this.velocity.applyQuaternion(this.$t.quaternion);
      this.$t.position.add(this.velocity);

      if (this.input["space"]) {
        var cannon = this.cannons[this.selectedCannon];

        (3).times(function(i) {

          tempVector.set((-1 + i) * 150, 0, 0).applyMatrix4(cannon.matrixWorld);

          var bullet = aqua.client.Bullet(tempVector.x, tempVector.y, tempVector.z)
            .addTo(this.$t.parent)
            .addChildTo(this.parent);
          bullet.rotation.order = "YXZ";
          bullet.rotation.x = Math.randfloat(5, 10).toRadian();
          bullet.rotation.y = cannon.rotation.y + this.rotation.y;

        }.bind(this));

        tempVector.set(0, 0, -300).applyMatrix4(cannon.matrixWorld);
        aqua.client.Explosion(tempVector.x, tempVector.y, tempVector.z, 0.8)
          .addTo(this.$t.parent)
          .addChildTo(this.parent);
      }

      if (this.camera) {
        var cannon = this.cannons[this.selectedCannon];

        tempVector.set(0, 1000, 3200).applyMatrix4(cannon.matrixWorld);
        this.camera.position.lerp(tempVector, 0.2);

        tempVector.set(0, 200, -4000).applyMatrix4(cannon.matrixWorld);
        this.cameraTarget.lerp(tempVector, 0.2);
        this.camera.lookAt(this.cameraTarget);
      }
    }

  });

  var tempVector = new THREE.Vector3();

});
