import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { postit : props.postit }
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        if (this.props && this.props.user.streamManager && !!this.videoRef) {
            console.log('PROPS: ', this.props);
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }

        if (this.props && this.props.user.streamManager.session && this.props.user && !!this.videoRef) {
            this.props.user.streamManager.session.on('signal:userChanged', (event) => {
                const data = JSON.parse(event.data);
                if (data.isScreenShareActive !== undefined) {
                    this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
        }
        // 포스트잇 업데이트
        if (this.props.postit !== prevProps.postit) {
            console.log('postit이 변경되었습니다. 새로운 postit:', this.props.postit);
            this.setState({ postit: this.props.postit });
        }
    }

    render() {
        const videoId = this.props.isFan ? 'fanVideo' : 'video'; // 아티스트 / 팬 값에 따라 id값 변동
        return (
            <>
            <video
                autoPlay={true}
                className={videoId}
                id={`${videoId} - ${this.props.user.getStreamManager().stream.streamId}`}
                ref={this.videoRef}
                muted={this.props.mutedSound}
            />
            {videoId && <div>
                <p>postit</p>
                <p>{this.state.postit}</p>
            </div>}
            </>
        );
    }
}
