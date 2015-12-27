phina.namespace(function() {

  phina.define("aqua.client.Button", {
    superClass: "phina.ui.Button",

    init: function(params) {
      this.superInit((params || {}).$extend({
        width: 400,
        fontFamily: "main",
        fill: null,
        stroke: "white",
        strokeWidth: 1,
      }));
    },

    onadded: function() {
      this.tweener
        .set({
          scaleX: 1.2,
          scaleY: 1.2,
        })
        .to({
          scaleX: 1.0,
          scaleY: 1.0,
        }, 500, "easeOutBounce");
    },

    onpointover: function() {
      this.fill = "hsla(260, 20%, 60%, 0.8)";
    },

    onpointout: function() {
      this.fill = null;
    },

    onpush: function() {
      this.flare("click");
    },

  });

});
