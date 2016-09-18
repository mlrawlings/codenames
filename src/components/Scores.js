import React from 'react';

const teamStyle = {
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  fontSize:'7vmin',
  fontWeight:300,
  color:'#fff',
  textAlign:'center'
};

const scoresStyle = {
  flex:0.15,
  flexDirection:'row',
  zIndex:3,
  boxShadow:'-1px 0 5vw #000'
};

function Scores({ team1, team2, tiles }) {
  var team1Remaining = tiles.filter(tile => !tile.show && tile.type.name === team1.name).length;
  var team2Remaining = tiles.filter(tile => !tile.show && tile.type.name === team2.name).length;
  var revealed = tiles.filter(tile => tile.show).length;
  return revealed ? (
    <div style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team2.color, borderRight:'1px solid #bab' }}>
        {team2Remaining}
      </div>
      <div style={{ ...teamStyle, backgroundColor:team1.color }}>
        {team1Remaining}
      </div>
    </div>
  ) : (
    <div style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team1.color }}>
        <span style={{ fontSize:'4vmin' }}>{team1.name}</span><span style={{ fontSize:'2vmin' }}>goes first</span>
      </div>
    </div>
  )
}

export default Scores;
