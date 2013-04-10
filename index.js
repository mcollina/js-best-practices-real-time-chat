
var package = require("./package");
var colors = require('colors');
var express = require('express');
var grunt = require("grunt");
var app = express();

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

app.listen(3000, function (err) {
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
