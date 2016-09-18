import React, { Component } from 'react';

const containerStyle = {
  flex:1
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onResize = this.onResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }
  onResize() {
    var width = this.container.clientWidth;
    var height = this.container.clientHeight;

    if(width/height > 1) {
      this.setState({ flexDirection:'row' })
    } else {
      this.setState({ flexDirection:'column' })
    }
  }
  render() {
    var { style } = this.props;
    var { flexDirection } = this.state;
    return (
      <div ref={el => this.container = el} style={{ ...containerStyle, ...style, flexDirection }}>
        {this.props.children}
      </div>
    )
  }
}

export default Container;
