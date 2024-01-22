import React, { Component } from 'react';
import './StreamComponent.css';

export default class OvVideoComponent extends Component {
    constructor(props) {
        super(props);
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

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
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
                <p>script</p>
                <p>{this.props.script}</p>
            </div>}
            </>
        );
    }
}
