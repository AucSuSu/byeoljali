import { OpenVidu } from 'openvidu-browser';

import axios from 'axios';
import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import UserVideoComponent from './comp/UserVideoComponent.js';
import './Station.css';
import { selectToken } from '../../Web/Stores/authReducer.js';
import { getData } from '../../Web/Stores/fanInfoReducer.js';
import { connect } from 'react-redux';
import Note from './custom/Note.jsx';
import Header from './custom/Header.jsx';
import Chat from './custom/Chat.jsx';
import Star from './custom/Star.jsx';
import Swal from 'sweetalert2';

const mapStateToProps = (state) => ({
  authToken: selectToken(state),
});

class App extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: this.props.propsData.sessionId,
      myUserName: this.props.propsData.nickname,
      curUser: this.props.curUser, // 현재 참여중인 유저의 번호
      session: this.props.propsData.sessionId,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      messages: [], // 채팅 메시지 저장
      remainingTime: 600, // 대기 시간 임시 개발
      myScript: [], // 스크립트 작성 내용
      myPostit: [], // 포스트잇 작성 내용
      orders: this.props.propsData.orders, // 대기번호
      joinFansign: this.props.joinFansign, // 팬싸인방 입장 트리거
      isSamePerson: false, // 같은 사람인지 판단
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.Meeting = this.Meeting.bind(this);
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.handleMyScript = this.handleMyScript.bind(this); // 스크립트 작성 바인드
    this.handleMyPostit = this.handleMyPostit.bind(this); // 포스트잇 작성 바인드
    this.mainVideoRef = React.createRef(); // 캡처
  }

  //실시간 마이크 볼륨 확인
  componentDidMount() {
    this.setupMicrophone();
    window.addEventListener('beforeunload', this.onbeforeunload);
    this.joinSession();
  }

  // joinFansign값이 업데이트 되면 이동 CheckPoint
  componentDidUpdate(prevProps, prevState) {
    if (this.props.joinFansign !== prevProps.joinFansign) {
      this.Meeting();
    }
    if (this.state.curUser !== prevState.curUser) {
      this.updateWaitTime();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    clearInterval(this.checkVolume);
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

          const maxVolume = 70;
          const limitedVolume = Math.min(average, maxVolume); // 볼륨 상한선 추가
          const volumeBar = document.getElementById('volume-bar');
          volumeBar.style.width = limitedVolume + '%'; // 볼륨 수치에 따라 너비 변경
        };

        this.checkVolume = setInterval(updateVolume, 100); // 해당 메서드 특정할 수 있게 해줌
      })
      .catch((error) => {
        console.error('마이크 접근 중 오류 발생:', error);
      });
  }
  // 팬싸인 이동 시 clear 하기.
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    clearInterval(this.timer); // 타이머 클리어
    clearInterval(this.checkVolume); // 볼륨 클리어
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
      myScript: e,
    });
  }

  handleMyPostit(e) {
    this.setState({
      myPostit: e,
    });
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
    this.OV = new OpenVidu();

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

        mySession.on('streamDestroyed', (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });
        mySession
          .connect(this.props.propsData.tokenId, {
            clientData: this.state.myUserName,
          })
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
          .catch((error) => {
            console.log('오픈비두 연결실패');
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
      remainingTime: (this.state.orders - this.state.curUser) * 120,
    });

    // 타이머 설정
    this.timer = setInterval(() => {
      this.setState((prevState) => ({
        remainingTime: Math.max(prevState.remainingTime - 1, 0), // 0 이하로 내려가지 않도록
      }));
      if (this.state.remainingTime === 20) {
        Swal.fire({
          icon: 'success',
          title: '곧 팬싸인이 시작됩니다 ',
          text: '아직 본인 인증을 안했다면 인증해주세요',
          background: '#222222',
          confirmButtonColor: '#FF2990',
          confirmButtonText: 'OK',
        });
      }
    }, 1000); // 매초마다 실행
  }

  leaveSession() {
    const mySession = this.state.session;
    mySession.disconnect();
  }

  Meeting() {
    // 팬싸방 이전 할 때 script와 postit Data를 전달
    const sendData = {
      birthday: this.props.propsData.birthday,
      nickname: this.state.myUserName,
      script: this.state.myScript,
      postit: this.state.myPostit,
      isSame: this.state.isSamePerson,
    };

    clearInterval(this.checkVolume); // 볼륨체크 클리어
    this.leaveSession();
    this.props.switchToFan(sendData);
  }

  // 채팅 메시지 전송 메서드
  sendMessage(message) {
    const messageData = {
      profileImage: this.props.propsData.profileImage,
      orders: this.state.orders,
      nickname: this.state.myUserName,
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
  /*updateWaitTime() {
    // 남은 사람 수에 기반한 대기 시간 계산
    const remainingUsers = Math.max(this.state.orders - this.state.curUser, 0);
    this.setState({ remainingTime: remainingUsers * 120 });
  }*/
  updateWaitTime() {
    const remainingUsers = Math.max(this.state.orders - this.state.curUser, 0);
    const newRemainingTime = remainingUsers * 30;
    // 현재 remainingTime 상태와 새로 계산된 값이 다를 때만 setState 호출
    if (this.state.remainingTime !== newRemainingTime) {
      this.setState({ remainingTime: newRemainingTime });
    }
  }

  // Base64 문자열을 Blob 객체로 변환하는 함수
  base64ToBlob(base64, contentType) {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  //화면 캡처 메서드
  captureMainVideo = () => {
    if (this.mainVideoRef.current) {
      html2canvas(this.mainVideoRef.current).then((canvas) => {
        // FormData 인스턴스 생성
        const formData = new FormData();
        // Canvas를 Base64 인코딩된 문자열로 변환
        const base64Image = canvas.toDataURL('unknown_person/jpg');

        // 'image' 필드에 파일 데이터 추가 (예제에서는 base64 인코딩된 이미지를 Blob으로 변환하여 추가)
        // Blob 변환 과정이 필요한 경우에만 아래의 'base64ToBlob' 함수 구현 참고
        const blob = this.base64ToBlob(base64Image);
        formData.append('image', blob, 'unknown_person.jpg'); // 두 번째 인자는 파일 데이터, 세 번째 인자는 파일명

        // axios를 사용하여 Base64 인코딩된 이미지 데이터를 POST 요청으로 전송
        // 플라스크 서버 주소 추가할 것!!!!!!!!!!
        axios
          .post('flask/checksame', formData, {
            headers: {
              Authorization: this.props.authToken,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            // 요청 성공 시 처리
            console.log('서버에 대기방 사진 전송 완료', response);
            if (response.data.isSamePerson) {
              console.log('얼굴 인증 완료');
              this.isSamePerson = true;
              Swal.fire({
                icon: 'success',
                title: '얼굴 인증 성공!!',
                background: '#222222',
                confirmButtonColor: '#FF2990',
                confirmButtonText: 'OK',
              });
            } else {
              console.log('얼굴 인증 실패!');
              Swal.fire({
                icon: 'warning',
                title: '얼굴 인증 실패!',
                text: '다시 시도해주세요',
                background: '#222222',
                confirmButtonColor: '#FF2990',
                confirmButtonText: 'OK',
              });
            }
          })
          .catch((error) => {
            // 요청 실패 시 처리
            console.error('서버에 대기방 사진 전송 실패', error);
          });
      });
    } else {
      console.log('본인 인증을 위한 DOM 요소가 준비되지 않았습니다.');
    }
  };

  render() {
    return (
      <div className="relative">
        <Star />
        <div className="flex flex-col h-screen font-jamsil bg-black text-white">
          {/* 헤더 고정 */}
          <div className="mb-8 z-10">
            <Header
              title={this.props.propsData.title}
              member={this.props.propsData.member}
              timer={this.state.remainingTime}
            />
          </div>

          {/* 나머지 3등분 */}
          {/* <div className="z-10" onClick={() => this.Meeting()}>
            Fansing 들어가기
          </div> */}
          <div className="flex h-[100%] w-[100%] overflow-hidden">
            {/* 첫번째 덩어리 */}
            <div className="flex flex-col h-[95%] flex-grow ml-8 mr-4 z-10 ">
              {/* 비디오 출력 화면 */}
              <div
                className="h-[70%] border-2 border-dark-gray overflow-hidden"
                ref={this.mainVideoRef}
                style={{ transform: 'rotateY(180deg)' }}
              >
                <UserVideoComponent
                  streamManager={this.state.mainStreamManager}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 볼륨 바 컨테이너 */}
              <div className="h-[10%] bg-dark-gray flex flex-row border-r-2 border-l-2 border-dark-gray items-center">
                <p className="pl-4 pr-4 mx-2 text-18">마이크</p>
                {/* 실제 볼륨 바 */}
                <div id="volume-bar" className="volume-bar pl-4 "></div>
              </div>

              {/* 캡처 버튼 */}
              <div className="flex flex-row h-[10%] border-2 border-dark-gray items-center justify-between ">
                <p className="pr-2 ml-10">
                  {this.isSamePerson
                    ? '본인 인증이 완료되었습니다'
                    : '본인 인증이 필요합니다'}
                </p>
                <button
                  className="bg-hot-pink rounded-md w-[20%] h-[50%] flex items-center justify-center mr-10 hover:scale-110 hover:border-2 hover:border-pink-400 hover:opacity-90"
                  onClick={this.captureMainVideo}
                >
                  본인 인증
                </button>
              </div>

              {/* 순서 */}
              <div className="bg-dark-gray flex flex-row h-[10%] border-l-2 border-r-2 border-b-2 border-dark-gray items-center text-18">
                <p className="border-r-2 pl-4 pr-4 mx-2">내 순서</p>
                <p className="pl-4">{this.state.orders}번째</p>
              </div>
            </div>

            {/* 두번째 덩어리 */}
            <div className="h-[95%] w-[30%] ml-4 mr-4 z-10">
              <Note
                handleScript={this.handleMyScript}
                handlePostit={this.handleMyPostit}
              />
            </div>
            {/* 세번쨰 덩어리 */}
            <div className=" w-[30%] h-[95%] ml-4 mr-8 z-10">
              <Chat
                orders={this.state.orders}
                messages={this.state.messages}
                handleSendMessage={this.sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
