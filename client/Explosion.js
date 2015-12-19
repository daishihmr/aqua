phina.namespace(function() {

  phina.define("aqua.client.Explosion", {
    superClass: "aqua.client.ThreeElement",

    init: function(x, y, z) {
      this.superInit(new THREE.Object3D());

      this.x = x;
      this.y = y;
      this.z = z;

      var geo = new THREE.SphereGeometry(120, 8, 4);
      var mat = new THREE.MeshBasicMaterial({
        // color: new THREE.Color("rgb(85, 85, 85)"),
        color: new THREE.Color("rgb(255, 102, 51)"),
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      var $t = this.$t;

      var array = Array.range(0, 50).map(function() {
        var p = new THREE.Mesh(geo, mat);
        $t.add(p);

        var q = new THREE.Quaternion();
        q.setFromEuler(new THREE.Euler(Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2), Math.randfloat(0, Math.PI * 2)));

        var q2 = new THREE.Quaternion();
        q2.setFromEuler(new THREE.Euler(Math.randfloat(0, Math.PI * 2) * 0.1, Math.randfloat(0, Math.PI * 2) * 0.1, Math.randfloat(0, Math.PI * 2) * 0.1));

        return [p, new THREE.Vector3(Math.randfloat(10, 40), 0, 0).applyQuaternion(q), q]
      });

      var age = 0;
      var s = 1.02;
      this.on("enterframe", function() {
        array.forEach(function(ps) {
          ps[0].position.add(ps[1]);
          ps[0].quaternion.multiply(ps[2]);
          ps[0].scale.multiplyScalar(s);
          
          ps[1].x *= 0.95;
          ps[1].y *= 0.95;
          ps[1].z *= 0.95;
        });
        
        age += 1;
        s -= 0.01;
        if (age > 100) {
          this.remove();
        }
      });
    }

  });

  var texture = null;

});
