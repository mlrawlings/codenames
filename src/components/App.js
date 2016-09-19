import React, { Component } from 'react';
import Container from './Container';
import Game from './Game';
import Video from './Video';
import io from 'socket.io-client';

const socket = io(location.protocol+'//'+(process.env.NODE_ENV === 'production' ? location.host : location.hostname+':2633'));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onShow = this.onShow.bind(this);
    this.onShowAll = this.onShowAll.bind(this);
    this.onRestart = this.onRestart.bind(this);
    this.onVideo = this.onVideo.bind(this);
  }
  componentDidMount() {
    var gameId = window.location.pathname.slice(1);

    if(!gameId) {
      socket.emit('create-game', {});
    } else {
      socket.emit('join-game', { id:gameId });
    }

    socket.on('game-data', (data) => {
      if(data.id !== this.state.id) {
        history.replaceState({}, '', data.id);
      }
      if(data.count !== this.state.count) {
        this.setState({ showAll:false, loading:false });
      }
      this.setState(data);
    });
  }
  onShow(word) {
    socket.emit('reveal-word', { id:this.state.id, word });
    this.state.board.forEach(tile => { if(tile.word === word) return tile.show = true });
    this.setState(this.state);
  }
  onShowAll() {
    this.setState({ showAll:!this.state.showAll });
  }
  onRestart() {
    socket.emit('create-game', { id:this.state.id });
    this.setState({ loading:true });
  }
  onVideo() {
    this.setState({ video:!this.state.video });
    window.dispatchEvent(new Event('resize'));
  }
  render() {
    var { id, video, team1, team2, board, showAll, loading } = this.state;
    var { onShow, onShowAll, onRestart, onVideo } = this;
    return (
      <Container>
        {video && (
          <Video id={id} />
        )}
        {id && (
          <Game team1={team1}
                team2={team2}
                board={board}
                loading={loading}
                showAll={showAll}
                video={video}
                onShow={onShow}
                onShowAll={onShowAll}
                onRestart={onRestart}
                onVideo={onVideo} />
        )}
      </Container>
    )
  }
}

export default App;
