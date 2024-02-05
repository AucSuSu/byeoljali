import React, { Component } from 'react';
import './Video.css';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log('PROPS: ', this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        'signal:userChanged',
        (event) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        },
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <>
        <video
          autoPlay={true}
          id={`${this.props.user.getStreamManager().stream.streamId}`}
          ref={this.videoRef}
          muted={false}
        />
      </>
    );
  }
}
