
$(window).ready(function () {
  var socket = io.connect('http://localhost');
  var send = $("#send");
  var form = $("form");
  var username = $("#username");
  var message = $("#message");
  var messages = $("#messages");
  var messageTemplate = _.template($("#message-template").html());

  var update = function (data) {
    var element = $(messageTemplate(data));
    element.hide().fadeIn('slow');
    messages.prepend(element);
  };

  send.attr("disabled", "disabled");

  socket.on('connect', function () {
    send.removeAttr("disabled");
  });

  socket.on("chat", update);

  form.submit(function () {
    var data = { username: username.val(), message: message.val() };
    socket.emit("chat", data);
    update(data);
    return false;
  });
});

