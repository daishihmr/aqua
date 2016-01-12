phina.define("aqua.client.Splash", {
  superClass: "aqua.client.ThreeElement",
  
  init: function(position, scale) {
    this.superInit(new THREE.Object3D());
    this.position.copy(position);
    this.rotation.y = Math.randfloat(0, (360).toRadian());
    
    scale = scale || 1.0;

    var body = phina.asset.AssetManager.get("vox", "splash").clone();
    var tex = body.material.map;
    body.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: tex,
      transparent: true,
      opacity: 0.5,
    });
    body.scale.set(scale * 0.25, scale * 0.25, scale * 0.25);
    this.$t.add(body);

    this.scaleY = 0.001;
    this.tweener
      .to({
        scaleY: Math.randfloat(1.5, 3.0)
      }, 1000, "easeOutQuad")
      .to({
        scaleY: 0.001
      }, 1000, "easeInQuad")
      .call(function() {
        this.remove();
      }.bind(this));
  }

});
