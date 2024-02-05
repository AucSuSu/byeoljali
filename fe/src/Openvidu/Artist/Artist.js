import { OpenVidu } from 'openvidu-browser';
import React, { Component } from 'react';
import './Artist.css';
import OpenViduLayout from '../Artist/layout/openvidu-layout';
import UserModel from '../Artist/models/user-model';
import Header from './custom/Header.jsx';
import Footer from './custom/Footer.jsx';
import Postit from './custom/Postit.jsx';
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
      mySessionId: this.props.propsData.sessionId,
      myUserName: this.props.propsData.member,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'block',
      currentVideoDevice: undefined,
      postit: undefined, // postit 저장
      count: 0, // 참여인원 수
      signTime: 30, // 팬싸인 시간
      joinNo: null, // 호출해야 하는 번호
      fanData: this.props.fanData,
      number: '테스트용',
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.addCount = this.addCount.bind(this);
    this.removeCount = this.removeCount.bind(this);
    this.goodbye = this.goodbye.bind(this);
    this.timerEvnet = this.timerEvnet.bind(this);
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
  }

  componentDidUpdate(prevProps, prevState) {
    // props가 변했을 때 A함수 실행
    if (this.props.someProp !== prevProps.someProp) {
      this.handlePropsChange();
    }

    // state가 변했을 때 B함수 실행
    if (this.state.number !== prevState.number && this.state.count === 1) {
      this.props.inviteFan(1);
    }
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
        // 참여 인원 카운트
        this.countEvent();

        // fanData 시그널 리스너
        this.state.session.on('signal', (event) => {
          const data = JSON.parse(event.data);
          if (data.type === 'fanData') {
            this.setState({
              postit: data.postit,
            });
          }
        });
      },
    );
  }

  // fan의 create 및 destroyed 이벤트 리스너
  countEvent() {
    const session = this.state.session;
    // connectionCreatd, connectionDestroyed는 openvidu에서 제공하는 기본 이벤트
    session.on('connectionCreated', () => {
      this.addCount();
    });
    session.on('connectionDestroyed', () => {
      this.removeCount();
    });
  }

  async connectToSession() {
    if (this.props.propsData.tokenId !== undefined) {
      this.connect(this.props.propsData.tokenId);
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

  // 인원 증가/감소 메서드
  addCount() {
    const count = this.state.count;
    this.setState({ count: count + 1 });
    if (this.state.count === 2) {
      this.setState({ signTime: 30 }); // 팬미팅 시간 갱신
      this.timerEvnet();
    }
  }

  removeCount() {
    const count = this.state.count;
    this.setState({ count: count - 1 });
  }

  // 자동 입장 및 퇴장 타이머
  timerEvnet() {
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        signTime: Math.max(prevState.signTime - 1, 0), // 0 이하로 내려가지 않도록
      }));
      if (this.state.signTime === 0) {
        clearInterval(this.timer);
        {
          this.props.fanData && this.props.byebye(this.props.fanData.waitNo);
        } // checkponit
      }
    }, 1000); // 매초마다 실행
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
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className="OT_root OT_publisher custom-class" id="localUser">
                <Video user={localUser} />
              </div>
            )}
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
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className="OT_root OT_publisher custom-class"
                style={chatDisplay}
              >
                <Postit
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  postit={this.state.postit}
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
