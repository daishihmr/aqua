phina.namespace(function() {

  phina.define("aqua.client.Explosion", {
    superClass: "aqua.client.ThreeElement",

    init: function(x, y, z) {
      this.superInit(new THREE.Object3D());

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

      var array = Array.range(0, 20).map(function() {
        var p = new THREE.Mesh(geo, mat);
        var axis = new THREE.Vector3(Math.randfloat(-1, 1), Math.randfloat(-1, 1), Math.randfloat(-1, 1));
        axis.normalize();
        angle = Math.randfloat(0, Math.PI * 2);
        p.quaternion.setFromAxisAngle(axis, angle)
        $t.add(p);

        var q = new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2)));
        var v = new THREE.Vector3(1, 0, 0).multiplyScalar(Math.randfloat(5, 20)).applyQuaternion(q);

        return [p, v]
      });

      var age = 0;
      var s = 1.04;
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
        if (age > 40) {
          this.remove();
        }
      });
    }

  });

  var texture = null;

});
