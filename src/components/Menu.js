import React from 'react';
import linkIcon from '../images/qr.png';
import revealIcon from '../images/eye.png';
import videoIcon from '../images/video.png';
import restartIcon from '../images/refresh.png';

const menuStyle = {
  flexDirection:'row',
  padding:'12px 0px',
  backgroundColor:'#008866',
  color:'#fff',
  fontSize:'2vmin'
};

const buttonStyle = {
  alignItems:'center',
  justifyContent:'flex-end',
  cursor:'pointer',
  flex:1
}

const iconStyle = {
  height:40,
  width:40,
  backgroundColor:'#fff',
  padding:3,
  marginBottom:5,
  textAlign:'center',
  verticalAlign:'middle',
  borderRadius:5
}

function Menu(props) {
  var start = props.start;
  return (
    <div style={{ ...menuStyle, backgroundColor:start ? start.backgroundColor: '#555' }}>
      <div style={buttonStyle} onClick={props.onVideo}>
        <img style={iconStyle} alt="" src={videoIcon} />
        <span>start video</span>
      </div>
      <div style={buttonStyle} onClick={props.onLink}>
        <img style={iconStyle} alt="" src={linkIcon} />
        <span>get link</span>
      </div>
      <div style={buttonStyle} onClick={props.onShow}>
        <img style={iconStyle} alt="" src={revealIcon} />
        <span>reveal</span>
      </div>
      <div style={buttonStyle} onClick={props.onRestart}>
        <img style={iconStyle} alt="" src={restartIcon} />
        <span>new game</span>
      </div>
    </div>
  );
}

export default Menu;