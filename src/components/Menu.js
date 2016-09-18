import React from 'react';
import rulesIcon from '../images/Trophy.png';
import showIconOn from '../images/Visible.png';
import showIconOff from '../images/Invisible.png';
import timerIcon from '../images/Stopwatch.png';
import videoIconOn from '../images/VideoMessage.png';
import videoIconOff from '../images/VideoEnd.png';
import restartIcon from '../images/Restart.png';

const menuStyle = {
  flexDirection:'row',
  padding:'8px 0px',
  backgroundColor:'#222',
  color:'#fff',
  fontSize:'1.25vw',
  flex:1,
};

const buttonStyle = {
  alignItems:'center',
  justifyContent:'flex-end',
  cursor:'pointer',
  flex:1,
  textAlign:'center'
}

const iconStyle = {
  height:45,
  width:45,
  padding:0,
  marginBottom:5,
  textAlign:'center',
  verticalAlign:'middle',
}

function Menu(props) {
  var { video, showAll } = props;
  return (
    <div style={menuStyle}>
      <div style={buttonStyle} onClick={props.onVideo}>
        <img style={iconStyle} alt="" src={video ? videoIconOff : videoIconOn} />
        <span>{video ? 'stop video' : 'video chat'}</span>
      </div>
      <div style={buttonStyle} onClick={props.onTime}>
        <img style={iconStyle} alt="" src={timerIcon} />
        <span>start timer</span>
      </div>
      <div style={buttonStyle} onClick={props.onLink}>
        <img style={iconStyle} alt="" src={rulesIcon} />
        <span>how to play</span>
      </div>
      <div style={buttonStyle} onClick={props.onShow}>
        <img style={iconStyle} alt="" src={showAll ? showIconOff : showIconOn} />
        <span>{showAll ? 'hide words' : 'show words'}</span>
      </div>
      <div style={buttonStyle} onClick={props.onRestart}>
        <img style={iconStyle} alt="" src={restartIcon} />
        <span>new game</span>
      </div>
    </div>
  );
}

export default Menu;