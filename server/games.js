const NUM = 24;
const words = require('./words');
const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');
const cachePath = path.join(__dirname, './game-cache.json')
var games;

try {
  games = require(cachePath);
  fs.unlinkSync(cachePath);
  cleanGames();
} catch(e) {
  games = {};
}

process.on('exit', exitHandler.bind(null,{ cleanup:true }));
process.on('SIGINT', exitHandler.bind(null, { cleanup:true, exit:true }));
process.on('uncaughtException', exitHandler.bind(null, { exit:true }));

function exitHandler(options, err) {
    if (options.cleanup) {
      Object.keys(games).forEach(id => games[id].clients = 0);
      fs.writeFileSync(cachePath, JSON.stringify(games));
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

function cleanGames() {
  Object.keys(games).forEach(id => {
    var game = games[id];
    if(game.clients === 0 && game.exitTime < Date.now()-30*60*1000) {
      delete games[id];
    }
  });
  setTimeout(cleanGames, 10*60*1000); //run every 10 minutes
}

exports.createGame = createGame;
exports.joinGame = joinGame;
exports.leaveGame = leaveGame;
exports.revealWord = revealWord;

function createGame(id) {
    var game = games[id] || {
      id: id || randomstring.generate(7),
      clients:1,
      count:0
    }

    var start = game.team1 ? types.indexOf(game.team2) : (Math.random() < 0.5 ? 0 : 1);
    var words = getWords();

    game.team1 = types[start];
    game.team2 = types[(start+1)%2];

    game.board = getBoard(start).map((tile, i) => ({
      word:words[i],
      type:types[tile]
    }));

    game.count++;

    games[game.id] = game;

    return game;
}

function joinGame(id) {
    var game = games[id];
    if(game) {
      game.clients++;
      return game;
    } else {
      return createGame(id);
    }
}

function revealWord(id, word) {
    var game = games[id];
    game.board.some(tile => {
      if(tile.word === word) {
        return tile.show = true;
      }
    });
    return game;
}

function leaveGame(id) {
    var game = games[id];
    if(game && !--game.clients) {
      game.exitTime = Date.now();
    }
}

function getWords() {
    var total = words.length;
    var marks = new Array(total);
    var picks = [];
    while(picks.length < NUM) {
        var randomIndex = Math.floor(Math.random() * total);
        if(!marks[randomIndex]) {
            marks[randomIndex] = true;
            picks.push(words[randomIndex]);
        }
    }
    return picks;
}

var types = [{
  name:'red',
  color:'#b02',
  order:0
},{
  name:'blue',
  color:'#06b',
  order:1
},{
  color:'#bbb2aa',
  order:3
},{
  color:'#888',
  backgroundColor:'#222',
  inverse:true,
  order:2
}];

const board = [
    0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 3,
];

function getBoard(start) {
    var copy = [start].concat(board);
    return shuffle(copy);
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}