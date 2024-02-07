import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import './Fan.css';
import OpenViduLayout from '../Fan/layout/openvidu-layout';
import UserModel from '../Artist/models/user-model';
import Header from './custom/Header.jsx';
import Footer from './custom/Footer.jsx';
import Script from './custom/Script.jsx';
import Video from './custom/Video.js';

let localUser = new UserModel();

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: this.props.sessionId,
      myUserName: '내 이름으로 props 받기',
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'block',
      currentVideoDevice: undefined,
      signTime: 30, // 팬싸인회 시간
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkSize = this.checkSize.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions,
    );
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();

    // 팬싸인방 Mount 되면 바로 timer 실행
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        signTime: Math.max(prevState.signTime - 1, 0), // 0 이하로 내려가지 않도록
      }));
      if (this.state.signTime === 0) {
        clearInterval(this.timer);
      }
    }, 1000); // 매초마다 실행
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      },
    );
  }

  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log('토큰 받았음 : ', this.props.token);
      this.connect(this.props.token);
    } else {
      console.log('초비상!!! 토큰없다!!!!!!');
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === 'videoinput');

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setStreamManager(publisher);
    this.subscribeToStreamDestroyed();

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            'custom-class',
          );
        });
      },
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
          });
        }
        this.updateLayout();
      },
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      subscriber.on('streamPlaying', (e) => {
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });

      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    this.state.session.on('streamDestroyed', (event) => {
      this.deleteSubscriber(event.stream);
      event.preventDefault();
      this.updateLayout();
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }

    if (this.state.chatDisplay !== display) {
      // 상태가 변경될 때만 업데이트하는 걸로 수정 -> 무한루프 방지
      this.setState({ chatDisplay: display });
      this.updateLayout();
    }
  }

  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <Header
          title={this.props.propsData.title}
          member={this.props.propsData.member}
          timer={this.state.signTime}
        />
        <div id="layout" className="bounds">
          <div id="capture-site">
            <div>
              {localUser !== undefined &&
                localUser.getStreamManager() !== undefined && (
                  <div
                    className="OT_root OT_publisher custom-class"
                    id="localUser"
                  >
                    <Video user={localUser} />
                  </div>
                )}
            </div>
            <div>
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="OT_root OT_publisher custom-class"
                  id="remoteUsers"
                >
                  <Video
                    user={sub}
                    streamId={sub.streamManager.stream.streamId}
                  />
                </div>
              ))}
            </div>
          </div>
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className="OT_root OT_publisher custom-class"
                style={chatDisplay}
              >
                <Script
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  script={this.props.recieveScript.script}
                />
              </div>
            )}
        </div>
        <Footer id="4" toggleChat={this.toggleChat} />
      </div>
    );
  }
}
export default VideoRoomComponent;
