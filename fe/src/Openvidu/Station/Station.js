import { OpenVidu, Session } from 'openvidu-browser';

import axios from 'axios';
import React, { Component, useRef } from 'react';
import html2canvas from 'html2canvas';

import UserVideoComponent from './comp/UserVideoComponent.js';
import './Station.css';

// const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://byeoljali.shop/';

class App extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: this.props.sessionId,
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      myUserWait: 1, // 내 팬미팅 참여 순서
      curUser: 0, // 현재 참여중인 유저의 번호
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      messages: [], // 채팅 메시지 저장
      remainingTime: 600, // 대기 시간 임시 개발
      myScript: '스크립트를 작성해주세요', // 스크립트 작성 내용
      myPostit: '포스트잇을 작성해주세요', // 포스트잇 작성 내용
      wait: props.wait, // 대기번호
      token: this.props.token,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeUserWait = this.handleChangeUserWait.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.Meeting = this.Meeting.bind(this);
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.handleMyScript = this.handleMyScript.bind(this); // 스크립트 작성 바인드
    this.handleMyPostit = this.handleMyPostit.bind(this); // 포스트잇 작성 바인드
    this.invite = this.invite.bind(this); // 자동 초대 바인드
    this.mainVideoRef = React.createRef(); // 캡처
  }

  //실시간 마이크 볼륨 확인
  componentDidMount() {
    this.setupMicrophone();
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.joinSession();

    // 팬미팅이 종료 됬으면 초대 로직 실행
    if (this.state.wait !== undefined) {
      this.setState({ myUserWait: 0 });
      this.setState({
        myUserName: `팬미팅이 종료된 유저${this.state.wait - 1}`,
      });
      this.joinSession();
    }
  }

  setupMicrophone() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new AudioContext();
        const microphone = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        microphone.connect(analyser);

        const volumeMeter = document.getElementById('volume-meter');
        if (!volumeMeter) {
          console.error('volume-meter을 찾을 수 없음!');
          // return;
        }

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const average =
            dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          // console.log('>>>>>>볼륨: ' + average);

          // average 값으로 UI 업데이트 (예: CSS를 사용하여 높이 조절)
          // 수정된 부분: volumeMeter가 null이 아닌 경우에만 스타일 조작
          if (volumeMeter) {
            volumeMeter.style.height = `${average}px`;
          }
        };

        setInterval(updateVolume, 100);
      })
      .catch((error) => {
        console.error('마이크 접근 중 오류 발생:', error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    clearInterval(this.timer); // 타이머 클리어
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleChangeUserWait(e) {
    this.setState({
      myUserWait: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }
  // 스크립트 & 포스트잇 양방향 바인딩
  handleMyScript(e) {
    this.setState({
      myScript: e.target.value,
    });
  }

  handleMyPostit(e) {
    this.setState({
      myPostit: e.target.value,
    });
  }

  // 채팅 메시지 입력 처리 메서드
  handleMessageInput(event) {
    if (event.key === 'Enter') {
      this.sendMessage(event.target.value);
      event.target.value = '';
    }
  }

  // 임시 팬 자동 호출 ** 로직 고민해야 함 **
  invite() {
    const mySession = this.state.session;
    if (mySession) {
      mySession
        .signal({
          type: 'invite',
          data: JSON.stringify({ type: 'intive', userWait: this.state.wait }),
        })
        .then(() => {
          console.log('intive 전송 성공');
          this.leaveSession();
        })
        .catch((error) => {
          console.error('intive 전송 실패', error);
        });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // 채팅 관련 수정부분
        this.state.session.on('signal:chat', (event) => {
          const messageData = JSON.parse(event.data);
          const messages = this.state.messages;
          messages.push(messageData);
          this.setState({ messages });
        });

        // 자동 초대 리스너
        mySession.on('signal:invite', (event) => {
          const data = JSON.parse(event.data);
          /// 지금 === 쓰면 안됨, 하나가 str고 하나가 int인듯
          if (data.userWait == this.state.myUserWait) {
            this.Meeting();
          }
        });

        // 'session-left' 신호에 대한 리스너를 추가합니다.
        mySession.on('signal:session-left', (event) => {
          const data = JSON.parse(event.data);
          console.log(
            '닉네임' +
              data.userName +
              ' 대기번호 ' +
              data.userWait +
              ' has left the session',
          );
          // 필요한 추가 처리를 여기에 작성합니다.
          this.setState({
            curUser: data.userWait,
          });
          // 타이머 실행
          this.updateWaitTime();
        });

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });

          console.log(this.state.subscribers);
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---
        z;
        mySession
          .connect(this.state.token, { clientData: this.state.myUserName })
          .then(async () => {
            // --- 5) Get your own camera stream ---

            // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
            // element: we will manage it on our own) and with the desired properties
            let publisher = await this.OV.initPublisherAsync(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            });

            // --- 6) Publish your stream ---

            mySession.publish(publisher);

            // Obtain the current video device in use
            var devices = await this.OV.getDevices();
            var videoDevices = devices.filter(
              (device) => device.kind === 'videoinput',
            );
            var currentVideoDeviceId = publisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            var currentVideoDevice = videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId,
            );

            // Set the main video in the page to display our webcam and store our Publisher
            this.setState({
              currentVideoDevice: currentVideoDevice,
              mainStreamManager: publisher,
              publisher: publisher,
            });
          })
          .then(() => {
            if (this.state.myUserWait === 0) {
              this.invite();
            }
          })
          .catch((error) => {
            console.log(
              'There was an error connecting to the session:',
              error.code,
              error.message,
            );
          });
      },
    );

    // 초기 reaminingTime
    this.setState({
      remainingTime: (this.state.myUserWait - this.state.curUser) * 600,
    });

    // 타이머 설정
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        remainingTime: Math.max(prevState.remainingTime - 1, 0), // 0 이하로 내려가지 않도록
      }));
    }, 1000); // 매초마다 실행
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    // 세션을 떠나기 전에 다른 참여자들에게 신호를 보냅니다.

    // 세션에서 연결을 해제합니다.
    mySession.disconnect();

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionStation',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) =>
            device.deviceId !== this.state.currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  Meeting() {
    // 팬싸방 이전 할 때 script와 postit Data를 전달
    const sendData = {
      type: 'fanData',
      userWait: this.state.myUserWait,
      script: this.state.myScript,
      postit: this.state.myPostit,
    };

    const mySession = this.state.session;

    // 세션을 이동하기 전 다른 참여자에게 signal을 보냄
    if (mySession) {
      mySession
        .signal({
          type: 'session-left',
          data: JSON.stringify({
            userName: this.state.myUserName,
            userWait: this.state.myUserWait,
          }),
        })
        .then(() => {
          console.log(this.state.myUserName + ' has left the session');
        })
        .catch((error) => {
          console.error(error);
        });
    }
    this.leaveSession();
    this.props.onMeetingClick(sendData);
  }

  // 채팅 메시지 전송 메서드
  sendMessage(message) {
    const messageData = {
      user: this.state.myUserName,
      wait: this.state.myUserWait,
      text: message,
    };
    this.state.session
      .signal({
        type: 'chat',
        data: JSON.stringify(messageData),
      })
      .then(() => {
        console.log('Message sent: ' + message);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 타이머 관련 메서드
  updateWaitTime() {
    // 남은 사람 수에 기반한 대기 시간 계산
    const remainingUsers = Math.max(
      this.state.myUserWait - this.state.curUser,
      0,
    );
    this.setState({ remainingTime: remainingUsers * 600 });
  }

  //화면 캡처 메서드
  captureMainVideo = () => {
    html2canvas(this.mainVideoRef.current).then((canvas) => {
      // Canvas를 Base64 인코딩된 문자열로 변환
      const base64Image = canvas.toDataURL('unknown_person/jpg');

      // axios를 사용하여 Base64 인코딩된 이미지 데이터를 POST 요청으로 전송
      // 플라스크 서버 주소 추가할 것!!!!!!!!!!
      axios
        .post('YOUR_SERVER_ENDPOINT', {
          image: base64Image,
        })
        .then((response) => {
          // 요청 성공 시 처리
          console.log('서버에 대기방 사진 전송 완료', response);
        })
        .catch((error) => {
          // 요청 실패 시 처리
          console.error('서버에 대기방 사진 전송 실패', error);
        });
    });
  };

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    const myUserWait = this.state.myUserWait;
    const curUser = this.state.curUser;
    const remainingUsers = this.state.myUserWait - this.state.curUser; // 남은 인원 계산
    const minutes = Math.floor(this.state.remainingTime / 60); // 남은 시간 관련 계산
    const seconds = this.state.remainingTime % 60;

    return (
      <div className="container">
        {/* 입장전 화면 */}
        {this.state.session === undefined ? (
          <div id="join">
            <div id="img-div">
              <img
                src="resources/images/openvidu_grey_bg_transp_cropped.png"
                alt="OpenVidu logo"
              />
            </div>
            <div id="join-dialog" className="jumbotron vertical-center">
              <h1> Join a video session </h1>
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <label>Participant: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label> Session: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p>
                  <label> WaitNo: </label>
                  <input
                    className="form-control"
                    type="text"
                    id="userWait"
                    value={myUserWait}
                    onChange={this.handleChangeUserWait}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    className="btn btn-lg btn-success"
                    name="commit"
                    type="submit"
                    value="JOIN"
                  />
                </p>
              </form>
            </div>
          </div>
        ) : null}

        {/* 입장후 화면 */}
        {this.state.session !== undefined ? (
          <div id="session" className="p-4">
            <div
              id="session-header"
              className="flex items-center justify-between mb-4"
            >
              {/* sessionId 가리기(테스트 중이라 열어놓음) */}
              <h1 id="session-title" className="text-2xl font-bold">
                {mySessionId}
              </h1>
              <div className="flex space-x-4">
                <span>
                  <strong>내 대기번호 :</strong> {myUserWait}
                </span>
                <span>
                  <strong>현재 참여번호 :</strong> {curUser}
                </span>
                <span>
                  <strong>남은 인원 :</strong> {remainingUsers}
                </span>
                <span>
                  <strong>예상 대기 시간 :</strong>{' '}
                  {`${minutes}분 ${seconds.toString().padStart(2, '0')}초`}
                </span>
              </div>
              <div className="flex space-x-4">
                <input
                  className="btn btn-danger"
                  type="button"
                  id="buttonLeaveSession"
                  onClick={this.leaveSession}
                  value="Leave session"
                />
                <button className="btn" onClick={this.Meeting}>
                  Meeting
                </button>
              </div>
            </div>

            {/* 비디오 출력 화면 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div id="main-video" ref={this.mainVideoRef}>
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                />
              </div>

              {/* 캡처 버튼 */}
              <button onClick={this.captureMainVideo}>캡쳐하기</button>

              {/* 스크립트 & 포스트잇 */}
              <div id="script-postit">
                <div className="mb-4">
                  <label className="font-bold text-lg text-blue-500">
                    Script
                  </label>
                  <input
                    className="border rounded p-2 w-full"
                    type="text"
                    value={this.state.myScript}
                    onChange={this.handleMyScript}
                  />
                </div>
                <div>
                  <label className="font-bold text-lg">Postit</label>
                  <input
                    className="border rounded p-2 w-full"
                    type="text"
                    value={this.state.myPostit}
                    onChange={this.handleMyPostit}
                  />
                </div>
              </div>

              {/* 채팅 추가 UI */}
              <div id="chat">
                <h2 className="text-xl font-bold mb-2">Chat</h2>
                <div id="message-list" className="mb-4">
                  {this.state.messages.map((messageData, index) => (
                    <div key={index} className="mb-2">
                      <strong>
                        {messageData.user} '대기순서'{messageData.wait}:
                      </strong>{' '}
                      {messageData.text}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Enter a message"
                  onKeyPress={this.handleMessageInput}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data; // The token
  }

  // 이하 채팅 추가 부분
  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.sendMessage(event.target.value);
      event.target.value = '';
    }
  };
}

export default App;
