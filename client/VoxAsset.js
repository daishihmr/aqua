phina.define("aqua.client.VoxAsset", {
  superClass: "phina.asset.Asset",
  
  _asset: null,

  init: function() {
    this.superInit();
  },

  _load: function(resolve) {
    var self = this;
    var parser = new vox.Parser();
    parser.parse(this.src).then(function(voxelData) {
      var builder = new vox.MeshBuilder(voxelData, {
        voxelSize: 20,
        vertexColor: false,
        optimizeFaces: false,
      });
      self._asset = builder.createMesh();
      resolve(self);
    });
  },
  
  get: function() {
    return this._asset.clone();
  }
});

phina.asset.AssetLoader.assetLoadFunctions["vox"] = function(key, path) {
  var asset = aqua.client.VoxAsset();
  var flow = asset.load(path);
  return flow;
};
