import React from 'react';
import Container from './Container';
import purify from '../util/purify';

const teamStyle = {
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  fontSize:'4vmin',
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
  var team1Remaining = 0;
  var team2Remaining = 0;
  var revealed = false;

  tiles.forEach(tile => {
    if(tile.show) {
      revealed = true;
    } else if(tile.type.name === team1.name) {
      team1Remaining++;
    } else if(tile.type.name === team2.name) {
      team2Remaining++;
    }
  });

  return revealed ? (
    <Container style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team2.color, borderRight:'1px solid #bab' }}>
        {team2Remaining}
      </div>
      <div style={{ ...teamStyle, backgroundColor:team1.color }}>
        {team1Remaining}
      </div>
    </Container>
  ) : (
    <div style={scoresStyle}>
      <div style={{ ...teamStyle, backgroundColor:team1.color }}>
        <span style={{ fontSize:'2vw', }}>{team1.name}</span>
        <span style={{ fontSize:'1vw', fontWeight:400 }}>plays first</span>
      </div>
    </div>
  )
}

export default purify(Scores);
