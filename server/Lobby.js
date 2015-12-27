var config = require("../config.json");
var phina = require("./libs/phina");
var log = require("./Log")("Lobby");
var TwitterAPI = require("node-twitter-api");
var twitter = new TwitterAPI({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  // callback: "http://" + config.domain + ":" + config.port + "/callback"
  callback: "http://localhost:81/aqua/client/callback.html",
});

require("./User");

phina.define("aqua.server.Lobby", {
  superClass: "phina.app.Scene",

  _eventBuffer: null,

  init: function() {
    this.superInit();
    this.fromJSON({
      _eventBuffer: [],
      children: {
        users: {
          className: "phina.app.Element"
        }
      }
    });
  },

  update: function() {
    var self = this;
    this._eventBuffer.forEach(function(ev) {
      self.flare(ev[0], ev[1]);
    });
    this._eventBuffer.clear();
  },

  addUser: function(user) {
    user.handle("StartLogin");
    user.handle("CalledBack");
    user.handle("LoginWithGuest");
    user.handle("MatchingStart");
    user.setHandler(this);
    user.addChildTo(this.users);
    log(user.name + " enter Lobby");
  },

  onStartLogin: function(ev) {
    log("onStartLogin");
    var user = ev.user;

    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
      if (error) {
        log(error);
        res.send(500);
        return;
      }

      user._auth = {};
      user._auth.requestToken = requestToken;
      user._auth.requestTokenSecret = requestTokenSecret;
      var url = "https://twitter.com/oauth/authenticate?oauth_token=" + user._auth.requestToken;
      user.socket.emit("Outh", {
        url: url
      });
    });
  },

  onCalledBack: function(ev) {
    log("CalledBack");
    log(ev.oauthVerifier);

    var self = this;
    var user = ev.user;
    var oauthVerifier = ev.oauthVerifier;
    var _auth = user._auth;

    twitter.getAccessToken(_auth.requestToken, _auth.requestTokenSecret, oauthVerifier,
      function(error, accessToken, accessTokenSecret, results) {
        if (error) {
          // TODO エラー
          return;
        }

        _auth.accessToken = accessToken;
        _auth.accessTokenSecret = accessTokenSecret;

        self.onGotAccessToken(user);
      }
    );
  },

  onGotAccessToken: function(user) {
    log("onGotAccessToken");

    var self = this;

    twitter.account(
      "verify_credentials", {},
      user._auth.accessToken,
      user._auth.accessTokenSecret,
      function(error, account) {
        if (error) {
          // TODO エラー
          return;
        } else {
          self.onGotUserInfo(user, account);
        }
      }
    );
  },

  onGotUserInfo: function(user, account) {
    log("onGotUserInfo");

    user.name = account.screen_name;
    user.icon = account.profile_image_url;
    user.twitterId = account.id;
    user._auth = null;

    console.log(user.name);
    console.log(user.twitterId);
    console.log(user.icon);

    user.socket.emit("LoginSucceeded", {
      name: user.name,
      icon: user.icon
    });
  },
  
  onLoginWithGuest: function(ev) {
    log("onLoginWithGuest");
    
    var user = ev.user;
    
    user.name = "guest-" + Date.now();
    user.icon = "./assets/guest.png";

    user.socket.emit("LoginSucceeded", {
      name: user.name,
      icon: user.icon
    });
  }

});
