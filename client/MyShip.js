phina.define("aqua.client.MyShip", {
  superClass: "aqua.client.Ship",
  
  cannonSprites: null,
  beforeSelectedCannon: -1,
  
  init: function() {
    this.superInit();
    this.superUpdate = aqua.client.Ship.prototype.update;
    
    this.cannonSprites = [];
  },
  
  update: function(app) {
    var kb = app.keyboard;
    this.input["up"] = kb.getKey("w");
    this.input["down"] = kb.getKey("s");
    this.input["left"] = kb.getKey("a");
    this.input["right"] = kb.getKey("d");
    this.input["cannonRotation"] = (kb.getKeyDirection().x * -2).toRadian();
    this.input["cannonSelectUp"] = kb.getKeyDown("up");
    this.input["cannonSelectDown"] = kb.getKeyDown("down");
    this.input["space"] = kb.getKeyDown("space");
    
    if (this.beforeSelectedCannon != this.selectedCannon) {
      var self = this;
      this.cannonSprites.forEach(function(it, i) {
        if (i == self.selectedCannon) {
          it.image = phina.asset.AssetManager.get("image", "cannonRed");
        } else {
          it.image = phina.asset.AssetManager.get("image", "cannon");
        }
      })
      this.beforeSelectedCannon = this.selectedCannon;
    }
    
    this.superUpdate(app);
    
    this.cannonSprites[0].rotation = -this.cannon0.rotation.y.toDegree();
    this.cannonSprites[1].rotation = -this.cannon1.rotation.y.toDegree();
    this.cannonSprites[2].rotation = -this.cannon2.rotation.y.toDegree();
  },
  
  setCannonHud: function(cannonSprite0, cannonSprite1, cannonSprite2) {
    this.cannonSprites[0] = cannonSprite0;
    this.cannonSprites[1] = cannonSprite1;
    this.cannonSprites[2] = cannonSprite2;
    
    return this;
  }

});
