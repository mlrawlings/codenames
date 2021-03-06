var path = require('path');
var server = require('pushstate-server');
var app = server.start({ port:2633, directory:path.join(__dirname, '../public') });
var io = require('socket.io')(app);
var fs = require('fs');

function handler (req, res) {
  fs.readFile(__dirname + '/build/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var createGame = require('./games').createGame;
var joinGame = require('./games').joinGame;
var revealWord = require('./games').revealWord;
var leaveGame = require('./games').leaveGame;

io.on('connection', function (socket) {
  socket.on('create-game', function (data) {
    var game = createGame(data.id);
    socket.join('game-'+game.id);
    io.to('game-'+game.id).emit('game-data', game);
    socket.game = game.id;
  });
  socket.on('join-game', function (data) {
    var game = joinGame(data.id);
    socket.join('game-'+game.id);
    socket.emit('game-data', game);
    socket.game = game.id;
  });
  socket.on('reveal-word', function (data) {
    revealWord(socket.game, data.word);
    io.to('game-'+socket.game).emit('reveal-word', data);
  });
  socket.on('start-video', function (data) {
    // io.to('game-'+data.id).emit('game-data', revealTile(data.word))
  });
  socket.on('disconnect', function(){
    leaveGame(socket.game);
    delete socket.game;
  });
});