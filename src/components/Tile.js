import React, { Component } from 'react';

const tileStyle = {
  verticalAlign:'middle',
  textAlign:'center',
  border:'4px solid #eee',
  background:'#fff',
  cursor:'pointer'
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { show:false };
    this.show = this.show.bind(this);
  }
  show() {
    this.props.onShow(this.props.word);
    this.setState({ show:true });
  }
  render() {
    var { props, state } = this;
    var { word, type, height, width, showAll } = props;
    var show = props.show || state.show;
    var length = Math.max(4, word.length);
    var opacity = show && showAll ? 0.2 : 1;
    var color = show || showAll ? type.color : '#000';
    var backgroundColor = show || showAll ? type.backgroundColor : '#fff';
    var fontSize = Math.min(1.35*width/length, height*0.75);
    var lineHeight = (height*0.9)+'px';
    var fontWeight = Math.max(300, Math.round(0.7*Math.pow(width/fontSize, 1))*100);

    return (
      <div
        onClick={this.show}
        style={{
          ...tileStyle,
          fontSize,
          fontWeight,
          lineHeight,
          backgroundColor,
          color,
          opacity,
          width,
          height
        }}>
          {word.toLowerCase()}
      </div>
    )
  }
}

export default Tile;