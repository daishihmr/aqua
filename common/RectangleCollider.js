phina.define("aqua.common.RectangleCollider", {

  width: 0,
  height: 0,
  rotation: 0,

  init: function(params) {
    this.width = params.width;
    this.height = params.height;
    this.rotation = params.rotation;
  },

  _static: {
    isHit: function(me, another) {
      var getBoundingRect = function(sprite) {
        return phina.geom.Rect(
          sprite.x - sprite.width * sprite.originX * sprite.scaleX * 0.8,
          sprite.y - sprite.height * sprite.originY * sprite.scaleY * 0.8,
          sprite.width * sprite.scaleX * 0.8,
          sprite.height * sprite.scaleY * 0.8
        );
      };

      var bx = function(a, b) {
        var abr = getBoundingRect(a);
        var bbr = getBoundingRect(b);
        var L = phina.geom.Vector2().fromAngle(b.rotation, 1);
        var ea1 = phina.geom.Vector2().fromAngle(a.rotation, 1).mul(abr.width / 2);
        var ea2 = phina.geom.Vector2().fromAngle(a.rotation + 90, 1).mul(abr.height / 2);

        var ra = Math.abs(phina.geom.Vector2.dot(L, ea1)) + Math.abs(phina.geom.Vector2.dot(L, ea2));
        var rb = bbr.width / 2;

        var interval = Math.abs(phina.geom.Vector2.dot(phina.geom.Vector2(a.x - b.x, a.y - b.y), L));

        return interval < ra + rb;
      };

      var by = function(a, b) {
        var abr = getBoundingRect(a);
        var bbr = getBoundingRect(b);
        var L = phina.geom.Vector2().fromAngle(b.rotation + 90, 1);
        var ea1 = phina.geom.Vector2().fromAngle(a.rotation, 1).mul(abr.width / 2);
        var ea2 = phina.geom.Vector2().fromAngle(a.rotation + 90, 1).mul(abr.height / 2);

        var ra = Math.abs(phina.geom.Vector2.dot(L, ea1)) + Math.abs(phina.geom.Vector2.dot(L, ea2));
        var rb = bbr.height / 2;

        var interval = Math.abs(phina.geom.Vector2.dot(phina.geom.Vector2(a.x - b.x, a.y - b.y), L));

        return interval < ra + rb;
      };

      return bx(me, another) && by(me, another) && bx(another, me) && by(another, me);
    }
  }

});
