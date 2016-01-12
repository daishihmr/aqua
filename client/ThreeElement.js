phina.define("aqua.client.ThreeElement", {
  superClass: "phina.app.Element",
  
  init: function(threeObject) {
    this.superInit();
    this.$t = threeObject;
  },
  
  addChild: function(child) {
    phina.app.Element.prototype.addChild.call(this, child);
    if (child.$t) this.$t.add(child.$t);
  },

  onremoved: function() {
    this.$t.parent.remove(this.$t);
  },

  _accessor: {
    x: {
      get: function() {
        return this.$t.position.x;
      },
      set: function(v) {
        this.$t.position.x = v;
      }
    },
    y: {
      get: function() {
        return this.$t.position.y
      },
      set: function(v) {
        this.$t.position.y = v;
      }
    },
    z: {
      get: function() {
        return this.$t.position.z
      },
      set: function(v) {
        this.$t.position.z = v;
      }
    },
    scaleX: {
      get: function() {
        return this.$t.scale.x
      },
      set: function(v) {
        this.$t.scale.x = v;
      }
    },
    scaleY: {
      get: function() {
        return this.$t.scale.y
      },
      set: function(v) {
        this.$t.scale.y = v;
      }
    },
    scaleZ: {
      get: function() {
        return this.$t.scale.z
      },
      set: function(v) {
        this.$t.scale.z = v;
      }
    },
    rotX: {
      get: function() {
        return this.$t.rotation.x
      },
      set: function(v) {
        this.$t.rotation.x = v;
      }
    },
    rotY: {
      get: function() {
        return this.$t.rotation.y
      },
      set: function(v) {
        this.$t.rotation.y = v;
      }
    },
    rotZ: {
      get: function() {
        return this.$t.rotation.z
      },
      set: function(v) {
        this.$t.rotation.z = v;
      }
    },
    matrix: {
      get: function() {
        return this.$t.matrix;
      }
    },
    position: {
      get: function() {
        return this.$t.position;
      }
    },
    scale: {
      get: function() {
        return this.$t.scale;
      }
    },
    rotation: {
      get: function() {
        return this.$t.rotation;
      }
    },
    quaternion: {
      get: function() {
        return this.$t.quaternion;
      }
    },
  }
});
