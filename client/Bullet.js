phina.define("aqua.client.Bullet", {
  superClass: "aqua.client.ThreeElement",
  
  init: function(position, rotation, shipVelocity) {
    this.superInit(new THREE.Object3D());

    var body = phina.asset.AssetManager.get("vox", "bullet").get();
    body.scale.set(0.15, 0.15, 0.15);
    this.$t.add(body);
    
    this.velocity = new THREE.Vector3(0, 0, -20);
    
    this.x = position.x;
    this.y = position.y;
    this.z = position.z;
    this.rotation.copy(rotation);
    this.shipVelocity = shipVelocity;
  },
  
  update: function() {
    this.rotation.x -= (0.2).toRadian();
    this.velocity.set(0, 0, -20);
    this.velocity.applyQuaternion(this.quaternion);
    this.position.add(this.velocity);
    
    this.shipVelocity.multiplyScalar(0.99);
    this.position.add(this.shipVelocity);
    
    if (this.position.y < 0) {
      aqua.client.Splash(this.position)
        .addTo(this.$t.parent)
        .addChildTo(this.parent);
      this.remove();
    }
  }

});
