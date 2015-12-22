var config = require("./config.json");
require("./server/Application");

var io = require("socket.io")(config.port);

aqua.server.Application(io).run();
