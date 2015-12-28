phina.define("aqua.server.Matching", {
  superClass: "phina.app.Scene",
  
  users: null;

  init: function() {
    this.superInit();
    this.users = [];
  },
  
  addUser: function(user) {
    this.users.push(user);
  },
  
});
