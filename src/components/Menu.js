import React from 'react';

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

const videoIcon = "https://image.freepik.com/free-icon/video-chat-social_318-27933.png";
const linkIcon = "http://downloadicons.net/sites/default/files/mobile-qr-code-icons-75764.png";
const revealIcon = "http://iconshow.me/media/images/ui/ios7-icons/png/512/eye_1.png";
const restartIcon = "http://simpleicon.com/wp-content/uploads/refresh.png";

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