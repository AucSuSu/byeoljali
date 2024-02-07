import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    const videoStyle = {
      width: '100%', // 원하는 너비로 설정
      height: '100%', // 높이를 자동으로 조정
    };

    return <video autoPlay={true} ref={this.videoRef} style={videoStyle} />;
  }
}
