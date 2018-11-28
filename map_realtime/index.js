var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('New user conect '+socket.id );
    socket.on('chat message', function(msg){
      msg.id = socket.id;
      io.emit('chat message', msg);
    });

    
  });
  
  io.emit('some event', { for: 'everyone' });


http.listen(3000, function(){
  console.log('listening on *:3000');
});

