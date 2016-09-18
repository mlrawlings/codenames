import React from 'react';
import Container from './Container';

const teamStyle = {
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  fontSize:'4vw',
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

function Scores({ team1, team2, tiles, loading }) {
  var revealed = tiles.filter(tile => tile.show).length;

  if(!revealed || loading) {
    return !loading ? renderStartInfo(team1) : renderStartInfo(team2)
  }

  var team1Remaining = tiles.filter(tile => !tile.show && tile.type.name === team1.name).length;
  var team2Remaining = tiles.filter(tile => !tile.show && tile.type.name === team2.name).length;

  return (
    <Container style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team2.color, borderRight:'1px solid #bab' }}>
        {team2Remaining}
      </div>
      <div style={{ ...teamStyle, backgroundColor:team1.color }}>
        {team1Remaining}
      </div>
    </Container>
  )
}

function renderStartInfo(team) {
  return (
    <div style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team.color }}>
        <span style={{ fontSize:'2vw' }}>{team.name}</span><span style={{ fontSize:'1.25vw', fontWeight:400 }}>goes first</span>
      </div>
    </div>
  )
}

export default Scores;
