import React from 'react';
import Menu from './Menu';
import Board from './Board';

const gameStyle = {
  flex:1
};

function Game({ start, board, showAll, onRestart, onShow, onVideo, onShowAll }) {
  return (
    <div style={gameStyle}>
      <Menu start={start} onShow={onShowAll} onRestart={onRestart} onVideo={onVideo} />
      <Board tiles={board} onShow={onShow} showAll={showAll} />
    </div>
  )
}

export default Game;
