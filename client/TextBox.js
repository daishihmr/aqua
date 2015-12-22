phina.define("aqua.client.TextBox", {
  superClass: "phina.display.CanvasElement",

  init: function(options) {
    var self = this;
    this.superInit({
      width: 900,
      height: 40,
    });
    this.fromJSON({
      interactive: true,
      _input: document.createElement("input"),
      children: {
        background: {
          className: "phina.display.RectangleShape",
          arguments: (options || {}).$extend({
            fill: "hsla(220, 80%, 80%, 0.2)",
            strokeWidth: 0.5,
            width: 900,
            height: 40,
            cornerRadius: 6,
          })
        },
        hint: {
          className: "phina.display.Label",
          x: 900 * -0.5 + 10,
          arguments: {
            text: options.hint || "",
            fontFamily: "main",
            fill: "rgba(255, 255, 255, 0.3)",
            align: "left",
          }
        },
        textLabel: {
          className: "phina.display.Label",
          x: 900 * -0.5 + 10,
          arguments: {
            text: "",
            fontFamily: "main",
            fill: "#ffffff",
            align: "left",
          },
          visible: false,
        },
        cursor: {
          className: "phina.display.RectangleShape",
          arguments: {
            width: 1,
            height: 32,
            fill: "white",
            stroke: null,
          },
          visible: false,
          onadded: function() {
            this.tweener
              .fadeOut(200)
              .fadeIn(200)
              .wait(200)
              .setLoop(true);
          },
          update: function() {
            this.x = 900 * -0.5 + 10 + self.textLabel.calcWidth() * 0.5;
          }
        }
      }
    });

    var dummyCanvas = document.createElement("canvas");
    var dummyContext = dummyCanvas.getContext("2d");
    dummyContext.font = "{fontWeight} {fontSize}px {fontFamily}".format(this.textLabel);

    this._input.type = "text";
    this._input.style.position = "absolute";
    this._input.style.margin = "auto";
    this._input.style.width = "30px";
    this._input.style.height = "30px";
    this._input.style.left = "0px";
    this._input.style.top = "0px";
    this._input.style.bottom = "0px";
    this._input.style.right = "0px";
    this._input.style.zIndex = -1;
    this._input.addEventListener("focus", function() {
      self.background.stroke = "hsla(220, 80%, 80%, 0.5)";
      self.background.strokeWidth = 2;
      self.cursor.show();
    }, false);
    this._input.addEventListener("blur", function() {
      self.background.stroke = "white";
      self.background.strokeWidth = 0.5;
      self.cursor.hide();
    }, false);
    this._input.addEventListener("keyup", function() {
      self.textLabel.text = this.value;
      if (this.value) {
        self.hint.hide();
        self.textLabel.show();
      } else {
        self.hint.show();
        self.textLabel.hide();
      }
    }, false);

    document.body.appendChild(this._input);
  },

  onpointstart: function() {
    this._input.focus();
  },

});
