
$(window).ready(function () {
  var socket = io.connect('http://localhost');

  socket.on('connect', function () {
  });
});

