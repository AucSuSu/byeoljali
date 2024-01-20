import { OpenVidu, Session } from 'openvidu-browser';

import axios from 'axios';
import React, { Component } from 'react';
import './Station.css';
import UserVideoComponent from './comp/UserVideoComponent.js'

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000/';

class App extends Component {
    constructor(props) {
        super(props);

        // These properties are in the state's component in order to re-render the HTML whenever their values change
        this.state = {
            mySessionId: 'SessionStation',
            myUserName: 'Participant' + Math.floor(Math.random() * 100),
            myUserWait: 1, // 내 팬미팅 참여 순서 
            curUser : 0, // 현재 참여중인 유저의 번호
            session: undefined,
            mainStreamManager: undefined,  // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
            messages: [], // 채팅 메시지 저장

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
        this.Meeting = this.Meeting.bind(this)
    }

    //실시간 마이크 볼륨 확인
    componentDidMount() {
        this.setupMicrophone();
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    setupMicrophone() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const audioContext = new AudioContext();
                const microphone = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();

                analyser.fftSize = 256;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                microphone.connect(analyser);

                const volumeMeter = document.getElementById('volume-meter');
                if (!volumeMeter) {
                    console.error("volume-meter을 찾을 수 없음!");
                    // return;
                }

                const updateVolume = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
                    console.log('>>>>>>볼륨: ' + average);

                    // average 값으로 UI 업데이트 (예: CSS를 사용하여 높이 조절)
                    // 수정된 부분: volumeMeter가 null이 아닌 경우에만 스타일 조작
                    if (volumeMeter) {
                        volumeMeter.style.height = `${average}px`;
                    }
                };

                setInterval(updateVolume, 100);
            })
            .catch(error => {
                console.error('마이크 접근 중 오류 발생:', error);
            });
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
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
        })
    }

    handleMainVideoStream(stream) {
        if (this.state.mainStreamManager !== stream) {
            this.setState({
                mainStreamManager: stream
            });
        }
    }

    // 채팅 메시지 입력 처리 메서드
    handleMessageInput(event) {
        if (event.key === 'Enter') {
            this.sendMessage(event.target.value);
            event.target.value = '';
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

                // 'session-left' 신호에 대한 리스너를 추가합니다.
                mySession.on('signal:session-left', (event) => {
                    const data = JSON.parse(event.data);
                    console.log('닉네임' + data.userName + ' 대기번호 ' + data.userWait + ' has left the session');
                    // 필요한 추가 처리를 여기에 작성합니다.
                    this.setState({
                        curUser : data.userWait,
                    })
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

                // Get a token from the OpenVidu deployment
                this.getToken().then((token) => {
                    // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
                    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                    mySession.connect(token, { clientData: this.state.myUserName })
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
                            var videoDevices = devices.filter(device => device.kind === 'videoinput');
                            var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                            var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                            // Set the main video in the page to display our webcam and store our Publisher
                            this.setState({
                                currentVideoDevice: currentVideoDevice,
                                mainStreamManager: publisher,
                                publisher: publisher,
                            });
                        })
                        .catch((error) => {
                            console.log('There was an error connecting to the session:', error.code, error.message);
                        });
                });
            },
        );
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
            publisher: undefined
        });
    }

    async switchCamera() {
        try {
            const devices = await this.OV.getDevices()
            var videoDevices = devices.filter(device => device.kind === 'videoinput');

            if (videoDevices && videoDevices.length > 1) {

                var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

                if (newVideoDevice.length > 0) {
                    // Creating a new publisher with specific videoSource
                    // In mobile devices the default and first camera is the front one
                    var newPublisher = this.OV.initPublisher(undefined, {
                        videoSource: newVideoDevice[0].deviceId,
                        publishAudio: true,
                        publishVideo: true,
                        mirror: true
                    });

                    //newPublisher.once("accessAllowed", () => {
                    await this.state.session.unpublish(this.state.mainStreamManager)

                    await this.state.session.publish(newPublisher)
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

        const mySession = this.state.session;

        // 세션을 이동하기 전 다른 참여자에게 signal을 보냄
        if (mySession) {
            mySession.signal({
                type: 'session-left',
                data: JSON.stringify({ userName: this.state.myUserName, userWait: this.state.myUserWait }),
            }).then(() => {
                console.log(this.state.myUserName + ' has left the session');
            }).catch(error => {
                console.error(error);
            });
        }


        this.props.onMeetingClick()
    }

    // 채팅 메시지 전송 메서드
    sendMessage(message) {
        const messageData = {
            user: this.state.myUserName,
            wait: this.state.myUserWait,
            text: message
        };
        this.state.session.signal({
            type: 'chat',
            data: JSON.stringify(messageData),
        }).then(() => {
            console.log('Message sent: ' + message);
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        const mySessionId = this.state.mySessionId;
        const myUserName = this.state.myUserName;
        const myUserWait = this.state.myUserWait;
        const curUser = this.state.curUser;
        const remainingUsers = this.state.myUserWait - this.state.curUser; // 남은 인원 계산

        return (
            <div className="container">
                {/* 입장전 화면 */}
                {this.state.session === undefined ? (
                    <div id="join">
                        <div id="img-div">
                            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
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
                                    <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
                                </p>
                            </form>
                        </div>
                    </div>
                ) : null}

                {/* 입장후 화면 */}
                {this.state.session !== undefined ? (
                    <div id="session">
                        <div id="session-header">
                            {/* sessionId 가려놓음 */}
                            <h1 id="session-title">{mySessionId}</h1>
                            <span><strong>내 대기번호 : </strong>{myUserWait}</span>
                            <span>  /  </span>
                            <span><strong>현재 참여번호 : </strong>{curUser}</span>
                            <span>  /  </span>
                            <span><strong>남은 인원 : </strong>{remainingUsers}</span>
                            <span>  /  </span>
                            <span><strong>예상 대기 시간 : </strong>대기시간 적을예정</span>
                            <input
                                className="btn btn-large btn-danger"
                                type="button"
                                id="buttonLeaveSession"
                                onClick={this.leaveSession}
                                value="Leave session"
                            />
                            <button onClick={this.Meeting}>Meeting</button>
                            {/* 카메라 바꾸기 버튼 삭제 */}
                            {/* <input
                                className="btn btn-large btn-success"
                                type="button"
                                id="buttonSwitchCamera"
                                onClick={this.switchCamera}
                                value="Switch Camera"
                            /> */}
                        </div>

                        {this.state.mainStreamManager !== undefined ? (
                            <div id="main-video" className="col-md-6">
                                <UserVideoComponent streamManager={this.state.mainStreamManager} />
                            </div>
                        ) : null}
                        {/* 참여자 화면 끄려고 주석처리 */}
                        {/* 화면 끌 경우 상대방 소리도 안들림 */}
                        {/* <div id="video-container" className="col-md-6">
                            {this.state.publisher !== undefined ? (
                                <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                                    <UserVideoComponent
                                        streamManager={this.state.publisher} />
                                </div>
                            ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(sub)}>
                                    <span>{sub.id}</span>
                                    <UserVideoComponent streamManager={sub} />
                                </div>
                            ))}
                        </div> */}
                        {/* 참여자 화면 끄려고 주석 처리 */}


                        {/* 채팅 추가 ui */}
                        <div id="chat">
                            <h2>Chat</h2>
                            <div id="message-list">
                                {this.state.messages.map((messageData, index) => (
                                    <div key={index}><strong>{messageData.user} '대기순서'{messageData.wait}:</strong> {messageData.text}</div>
                                ))}
                            </div>
                            <input type="text" placeholder="Enter a message" onKeyPress={this.handleMessageInput} />
                        </div>
                        {/* 채팅 추가 ui */}
                    </div>

                ) : null}

            </div>
        );
    }


    /**
     * --------------------------------------------
     * GETTING A TOKEN FROM YOUR APPLICATION SERVER
     * --------------------------------------------
     * The methods below request the creation of a Session and a Token to
     * your application server. This keeps your OpenVidu deployment secure.
     *
     * In this sample code, there is no user control at all. Anybody could
     * access your application server endpoints! In a real production
     * environment, your application server must identify the user to allow
     * access to the endpoints.
     *
     * Visit https://docs.openvidu.io/en/stable/application-server to learn
     * more about the integration of OpenVidu in your application server.
     */
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

    async createSession(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

    async createToken(sessionId) {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }

    // 이하 채팅 추가 부분
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.sendMessage(event.target.value);
            event.target.value = '';
        }
    }
}

export default App;