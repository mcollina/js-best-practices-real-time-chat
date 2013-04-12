
var package = require("./package");
var colors = require('colors');
var express = require('express');
var grunt = require("grunt");
var app = express();
var io = require("socket.io");
var http = require("http");

require("./Gruntfile")(grunt);

app.configure(function () {
  app.engine('jade', require('jade').__express);
  app.set('views', __dirname + '/views');
});

app.configure("development", function () {
  grunt.tasks(["default", "watch"]);
});

app.configure("production", function () {
  grunt.tasks(["production"]);
});

app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.cookieSession({
  secret: "a very long and RANDOM secret: 42" 
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index.jade");
});

var server = http.createServer(app);
io = io.listen(server);

io.sockets.on('connection', function (socket) {
  console.log("new client..".green, "feels good to be loved!".yellow);
  socket.on("chat", function (message) {
    console.log(message)
    socket.broadcast.emit("chat", message);
  });
});

server.listen(3000, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  var output = "";
  output += package.name.red;
  output += "@";
  output += package.version.yellow;
  output += " started up on port 3000".green;

  console.log(output);
});
