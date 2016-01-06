phina.namespace(function() {

  phina.define("aqua.client.Explosion", {
    superClass: "aqua.client.ThreeElement",

    init: function(x, y, z, scale) {
      this.superInit(new THREE.Object3D());
      
      scale = scale || 1.0;

      this.x = x;
      this.y = y;
      this.z = z;

      var color0 = new THREE.Color("rgb(255, 102, 51)");
      var color1 = new THREE.Color("rgb(128, 0, 0)");

      var geo = new THREE.BoxGeometry(100, 100, 100);
      var mat = new THREE.MeshBasicMaterial({
        // color: new THREE.Color("rgb(85, 85, 85)"),
        color: color0,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      var $t = this.$t;

      var array = Array.range(0, 20 * scale).map(function() {
        var p = new THREE.Mesh(geo, mat);
        $t.add(p);

        var q = new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2)));
        var v = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.randfloat(5, 25)).applyQuaternion(q);
        v.multiplyScalar(scale);

        return [p, v]
      });

      var age = 0;
      var s = 1.04 * scale;
      this.on("enterframe", function() {
        array.forEach(function(ps) {
          ps[0].position.add(ps[1]);
          ps[0].scale.multiplyScalar(s);

          ps[1].x *= 0.9;
          ps[1].y *= 0.9;
          ps[1].z *= 0.9;
        });

        age += 1;
        s -= 0.004;
        color0.lerp(color1, 0.1);
        mat.color = color0;
        if (s <= 0.004 || age > 50) {
          this.remove();
        }
      });
    }

  });

});
