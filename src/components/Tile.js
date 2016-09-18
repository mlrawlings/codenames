import React from 'react';
import Touchable from './Touchable';

const tileStyle = {
  verticalAlign:'middle',
  textAlign:'center',
  margin:4,
  cursor:'pointer',
  borderRadius:3,
  position:'relative'
};

const tileStyleHover = {
  boxShadow:'2px 2px 4px rgba(0,0,0,0.3)',
  top:-1,
  left:-1,
  zIndex:2
};

const tileStyleActive = {
  opacity:0.8,
  backgroundColor:'transparent',
  boxShadow:'none'
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

function Tile({ word, type, height, width, show, showAll, onShow }) {
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
    <Touchable
      onClick={() => onShow(word)}
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
      }}
      styleHover={!show && tileStyleHover}
      styleActive={!show && tileStyleActive}>
        {word.toLowerCase()}
    </Touchable>
  )
}

export default Tile;