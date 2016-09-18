import React from 'react';
import Menu from './Menu';
import Board from './Board';
import Scores from './Scores';

const gameStyle = {
  flex:1
};

const rowStyle = {
  flexDirection:'row',
  width:'100%',
  boxShadow:'0 1px 8px rgba(0,0,0,0.5)',
  zIndex:2,
  overflow:'hidden',
};

function Game({ team1, team2, board, showAll, loading, video, onRestart, onShow, onVideo, onShowAll }) {
  return (
    <div style={gameStyle}>
      <div style={rowStyle}>
        <Menu showAll={showAll} video={video} onShow={onShowAll} onRestart={onRestart} onVideo={onVideo} />
        <Scores team1={team1} team2={team2} tiles={board} />
      </div>
      <Board tiles={board} loading={loading} onShow={onShow} showAll={showAll} />
    </div>
  )
}

export default Game;
