import React from 'react';
import Menu from './Menu';
import Board from './Board';
import Scores from './Scores';
import purify from '../util/purify'

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

const open = (url) => () => window.open(url, '_blank');
const onSource = open('https://github.com/mlrawlings/codenames');
const onLink = open('https://github.com/mlrawlings/codenames/blob/master/HOW-TO-PLAY.md');

function Game({ team1, team2, board, showAll, loading, video, onRestart, onShow, onVideo, onShowAll }) {
  return (
    <div style={gameStyle}>
      <div style={rowStyle}>
        <Menu showAll={showAll} video={video} onShow={onShowAll} onRestart={onRestart} onVideo={onVideo} onSource={onSource} onLink={onLink} />
        <Scores team1={team1} team2={team2} tiles={board} />
      </div>
      <Board tiles={board} loading={loading} onShow={onShow} showAll={showAll} />
    </div>
  )
}

export default purify(Game);
