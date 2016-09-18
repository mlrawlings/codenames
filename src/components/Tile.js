import React, { Component } from 'react';

const tileStyle = {
  verticalAlign:'middle',
  textAlign:'center',
  margin:4,
  cursor:'pointer',
  borderRadius:3
};

const letterWidths = {
  b:1.2,
  d:1.2,
  f:0.6,
  i:0.4,
  j:0.4,
  l:0.4,
  m:1.7,
  p:1.2,
  q:1.2,
  r:0.6,
  t:0.6,
  w:1.5
}

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = { show:false };
    this.show = this.show.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.show) this.setState({ show:false });
  }
  show() {
    this.props.onShow(this.props.word);
    this.setState({ show:true });
  }
  render() {
    var { props, state } = this;
    var { word, type, height, width, showAll } = props;
    var show = props.show || state.show;
    var letters = Array.from(word.toLowerCase());
    var length = Math.max(4, letters.map(l => letterWidths[l] || 1).reduce((a, b) => a+b, 0));
    var opacity = show && showAll ? 0.3 : 1;
    var color = show || showAll ? type.color : '#222';
    var backgroundColor = show ? (type.backgroundColor || 'transparent') : ((showAll && type.backgroundColor) || '#fff');
    var fontSize = Math.min(1.5*width/length, height*0.75);
    var largestFontSize = Math.min(1.5*width/4, height*0.75);
    var lineHeight = (height*0.9)+'px';
    var fontWeight = Math.max(300, Math.round(3*Math.pow(largestFontSize/fontSize, 1.1))*100);
    var boxShadow = !show ? '1px 1px 2px rgba(0,0,0,0.15)' : 'none';

    height -= 8;
    width -= 8;

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
          height,
          boxShadow
        }}>
          {word.toLowerCase()}
      </div>
    )
  }
}

export default Tile;