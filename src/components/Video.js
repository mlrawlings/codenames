import React, { Component } from 'react';
import SimpleWebRTC from 'simplewebrtc';
import Container from './Container';

const videoStyle = {
  flex:1,
  position:'relative',
  background:'#999'
};

const localVideoStyle = {
  width:'20vmin',
  height:'20vmin',
  overflow:'hidden',
  position:'absolute',
  bottom:'2vmin',
  right:'2vmin',
};

const remoteVideosContainerStyle = {
  width:'100%',
  height:'100%',
  overflow:'hidden'
};

const remoteVideoStyle = {
  flex:1,
  overflow:'hidden'
}

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.webrtc = new SimpleWebRTC({
      localVideoEl:this.localVideo,
      remoteVideosEl:'',
      autoRequestMedia: true
    });
    this.webrtc.on('readyToCall', () => {
      this.webrtc.joinRoom(this.props.id);
    });
    this.webrtc.on('videoAdded', (video, peer) => {
      console.log('video added', peer);
      var remotes = this.remoteVideos.container;
      if (remotes) {
        var container = document.createElement('div');
        Object.assign(container.style, remoteVideoStyle);
        container.id = 'container_' + this.webrtc.getDomId(peer);
        container.appendChild(video);

        // suppress contextmenu
        video.oncontextmenu = function () { return false; };

        remotes.appendChild(container);
      }
    });
    this.webrtc.on('videoRemoved', (video, peer) => {
      console.log('video removed ', peer);
      var remotes = this.remoteVideos.container;
      var el = document.getElementById(peer ? 'container_' + this.webrtc.getDomId(peer) : 'localScreenContainer');
      if (remotes && el) {
        remotes.removeChild(el);
      }
    });
  }
  componentWillUnmount() {
    // this.webrtc.leaveRoom()
    this.webrtc.stopLocalVideo();
    this.webrtc.disconnect();
  }
  render() {
    return (
      <div style={videoStyle}>
        <div ref={el => this.localVideo = el} style={localVideoStyle} />
        <Container ref={el => this.remoteVideos = el} style={remoteVideosContainerStyle} />
      </div>
    )
  }
}

export default Video;
