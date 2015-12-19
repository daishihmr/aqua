var Log = function(tag) {
  return function(log) {
    var d = new Date();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log.apply(console, Array.prototype.concat.apply([time, tag], arguments));
  }
};

module.exports = Log;
