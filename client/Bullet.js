phina.define("aqua.client.Bullet", {
  superClass: "aqua.client.ThreeElement",
  
  init: function(x, y, z) {
    this.superInit(new THREE.Object3D());

    var body = phina.asset.AssetManager.get("vox", "bullet").get();
    var tex = body.material.map;
    body.material = new THREE.MeshBasicMaterial({
      map: tex,
    });
    body.scale.set(0.10, 0.10, 0.10);
    this.$t.add(body);
    
    this.velocity = new THREE.Vector3(0, 0, -20);
    
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.update();
  },
  
  update: function() {
    this.rotation.x -= (0.2).toRadian();
    this.velocity.set(0, 0, -20);
    this.velocity.applyQuaternion(this.quaternion);
    this.position.add(this.velocity);
    
    if (this.position.y < 0) {
      aqua.client.Splash(this.position)
        .addTo(this.$t.parent)
        .addChildTo(this.parent);
      aqua.client.Explosion(this.position.x, this.position.y, this.position.z)
        .addTo(this.$t.parent)
        .addChildTo(this.parent);
      this.remove();
    }
  }

});
