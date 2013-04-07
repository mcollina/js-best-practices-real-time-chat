
var package = require("./package");
var colors = require('colors');

var output = "";
output += package.name.red;
output += "@";
output += package.version.yellow;
output += " starting up".green;

console.log(output);
