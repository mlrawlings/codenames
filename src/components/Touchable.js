import React, { Component } from 'react';

class Touchable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.setHover = this.setHover.bind(this);
    this.unsetHover = this.unsetHover.bind(this);
    this.setActive = this.setActive.bind(this);
    this.unsetActive = this.unsetActive.bind(this);
  }
  setHover() {
    this.setState({ isHover:true });
  }
  unsetHover() {
    this.setState({ isHover:false });
  }
  setActive() {
    this.setState({ isActive:true });
  }
  unsetActive() {
    this.setState({ isActive:false });
  }
  componentDidMount() {
    this.el.addEventListener('mouseover', this.setHover);
    this.el.addEventListener('mouseout', this.unsetHover);

    this.el.addEventListener('mousedown', this.setActive);
    document.addEventListener('mouseup', this.unsetActive);

    this.el.addEventListener('touchstart', this.setActive);
    document.addEventListener('touchmove', this.unsetActive);
    document.addEventListener('touchend', this.unsetActive);
  }
  componentWillUnmount() {
    this.el.removeEventListener('mouseover', this.setHover);
    this.el.removeEventListener('mouseout', this.unsetHover);

    this.el.removeEventListener('mousedown', this.setActive);
    document.removeEventListener('mouseup', this.unsetActive);

    this.el.removeEventListener('touchstart', this.setActive);
    document.removeEventListener('touchmove', this.unsetActive);
    document.removeEventListener('touchend', this.unsetActive);
  }
  render() {
    var { style, styleHover, styleActive, ...other } = this.props;
    var { isHover, isActive } = this.state;

    if(isActive && isHover && styleActive) {
        style = { ...style, ...styleActive };
    } else if(isHover && styleHover) {
        style = { ...style, ...styleHover };
    }

    return (
      <div ref={el => this.el = el} style={style} {...other}>
        {this.props.children}
      </div>
    )
  }
}

export default Touchable;
