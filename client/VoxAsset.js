phina.define("aqua.client.VoxAsset", {
  superClass: "phina.asset.Asset",
  
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
        optimizeFaces: true,
      });
      var mesh = builder.createMesh();
      resolve(mesh);
    });
  },
});

phina.asset.AssetLoader.assetLoadFunctions["vox"] = function(key, path) {
  var asset = aqua.client.VoxAsset();
  var flow = asset.load(path);
  return flow;
};
