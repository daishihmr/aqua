var config = require("../config.json");
var phina = require("./libs/phina");
var log = require("./Log")("Lobby");
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
  consumerKey: config.consumerKey,
  consumerSecret: config.consumerSecret,
  // callback: "http://" + config.domain + ":" + config.port + "/callback"
  callback: "http://localhost:81/aqua/client/callback.html",
});

require("./User");

phina.define("aqua.server.Lobby", {
  superClass: "phina.app.Scene",

  init: function() {
    this.superInit();
    this.fromJSON({
      children: {
        users: {
          className: "phina.app.Element"
        }
      }
    })
  },

  addUser: function(user) {
    user.handler = this;
    user.addChildTo(this.users);
    log("ok")
  },

  onstartlogin: function(ev) {
    log("onstartlogin");
    var user = ev.user;

    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
      if (error) {
        log(error);
        res.send(500);
        return;
      }

      user.auth = {};
      user.auth.requestToken = requestToken;
      user.auth.requestTokenSecret = requestTokenSecret;
      var url = 'https://twitter.com/oauth/authenticate?oauth_token=' + user.auth.requestToken;
      user.socket.emit("outh", {
        url: url
      });
    });
  },

  oncallback: function(ev) {
    log("callback");
    log(ev.oauthVerifier);

    var self = this;
    var user = ev.user;
    var oauthVerifier = ev.oauthVerifier;
    var auth = user.auth;

    twitter.getAccessToken(auth.requestToken, auth.requestTokenSecret, oauthVerifier,
      function(error, accessToken, accessTokenSecret, results) {
        if (error) {
          // TODO エラー
          return;
        }

        auth.accessToken = accessToken;
        auth.accessTokenSecret = accessTokenSecret;

        self.getUserInfo(user);
      }
    );
  },

  getUserInfo: function(user) {
    var self = this;

    twitter.account(
      'verify_credentials', {},
      user.auth.accessToken,
      user.auth.accessTokenSecret,
      function(error, account) {
        if (error) {
          // TODO エラー
          return;
        } else {
          self.onGetUserInfo(user, account);
        }
      }
    );
  },

  onGetUserInfo: function(user, account) {
    user.name = account.screen_name;
    user.icon = account.profile_image_url;
    user.twitterId = account.id;
    user.auth = null;
    
    console.log(user.name);
    console.log(user.twitterId);
    console.log(user.icon);
    
    user.socket.emit("loginsuccess", {
      name: user.name,
      icon: user.icon
    });
  },

});
