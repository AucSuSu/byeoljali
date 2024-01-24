package com.example.be.controller;

import com.example.be.config.redis.RedisService;
import com.example.be.dto.SessionEnterResponseDto;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WebRTCController {
// trigger test
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    // Redis 연결 서버
     private final RedisService redisService;
    /**
     * test 목표
     * 연예인과 팬이 같은 방에 입장하도록 해보자
     *
     * 1. 팬싸인회가 시작되면 자동으로 하나의 세션 발생
     * -> 세션 아이디가 할당되면 해당 방에 연예인은 입장 되어있는 상태
     * -> 팬은 다른 세션에 존재하다가 시간이 되면 세션입장
     * -> 시간이 끝나면 자동으로 session에서 나가야함
     */
    // 자동 방 개설 (요청 : 자동)
    @GetMapping("/fansign")
    public ResponseEntity<String> makeByulZari()
            throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("*** 팬싸방, 대기방 개설 메소드 호출됨 *** ");
        /**
         * 총 두개의 방(팬싸방, 대기방)을 만들어야함
         */
        Map<String, Object> param = new HashMap<>(); // 이거 어떻게 다르게 쓰는지 조사좀 ^^&.. 해야할 듯
        SessionProperties propertiesFansign = SessionProperties.fromJson(param).build();
        //Session fansignSession = openvidu.createSession(propertiesFansign);
        SessionProperties propertiesWaitingRoom = SessionProperties.fromJson(param).build();
        //Session waitingRoomSession = openvidu.createSession(propertiesWaitingRoom);
        /**
         * 개설되면 memberFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
         * 개설되면 watingRoomFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
         * 1. 만료 시간은 어떻게 할까 ?
         */
        Long memberFansignId = 1L; // 예시 데이터
        //redisService.setValues("memberFansignSession".concat(String.valueOf(memberFansignId)), fansignSession.getSessionId());
        //redisService.setValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId)), waitingRoomSession.getSessionId());
        redisService.setValues("memberFansignSession".concat(String.valueOf(memberFansignId)),"fakeSessionId");
        // db에 팬싸인회 - 세션 아이디 저장
        // return new ResponseEntity<>(fansignSession.getSessionId(), HttpStatus.OK); // 방 연결
        return new ResponseEntity<>(redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId))), HttpStatus.OK); // 방 연결
    }


    // 방으로 입장하기 (이건 정말 방 입장만 해당하는 것임) !
    // 아티스트 -> 바로 방으로
    // 팬 -> 대기방에서 팬싸방으로 이동할때 해당 post
    // 아티스트/팬이냐에 따라 추가로 다른 요청 필요

    // 팬싸인회 클릭시 -> db에서 세션 아이디 조회 -> 입장
//    @PostMapping("/fan/fansigns/enter/{sessionId}")
//    public ResponseEntity<String> enterByulZari(@PathVariable("sessionId") String sessionId,
//                                                   @RequestBody(required = false) Map<String, Object> params)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        log.info("*** 입장 메서드 호출 ***");
//        Session session = openvidu.getActiveSession(sessionId);
//        if (session == null) { // 방이 없는 경우
//            log.info("*** " + sessionId + "번방이 없음 ***");
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
//        Connection connection = session.createConnection(properties);
//        log.info("*** 입장 완료***");
//
//        // return type wss://13.54.62.153?sessionId=ses_TU0gAC9hdr&token=tok_LtfbBU7NwuMMHXnt
//        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
//    }

    @GetMapping("/fan/fansigns/enter/v2/{sessionId}")
    public SessionEnterResponseDto enterByulZari(@PathVariable("sessionId") String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, Object> params = new HashMap<>();
        log.info("*** 입장 메서드 호출 ***");
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) { // 방이 없는 경우
            log.info("*** " + sessionId + "번방이 없음 ***");
            return new SessionEnterResponseDto(null, null);
        }

        /**
         * 혹시 나갔다가 들어와도 다시 들어왔을때 똑같은 토큰을 주면됨. 굳이 발급을 새로할 필요 없다.
         */
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        log.info("*** 입장 완료***");

        // return type wss://13.54.62.153?sessionId=ses_TU0gAC9hdr&token=tok_LtfbBU7NwuMMHXnt
        return new SessionEnterResponseDto(sessionId, connection.getToken());
    }

    /**
     * 팬 퇴장
     */
    // 나가기 시 저장되어있던 세션 아이디로 -> 퇴장
    @PostMapping("/fan/fansigns/exit/{sessionId}")
    public ResponseEntity<String> fanExitByulZari(@PathVariable("sessionId") String sessionId,
                                                  @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("*** 팬 :: 퇴장 메서드 호출 ***");

        /**
         *   서비스단의 관리 필요
         *   front에서 leaveSession 호출
         */

        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) { // 방이 없는 경우
            log.info("*** " + sessionId + "번방이 없음 ***");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        log.info("*** 팬 :: 퇴장 완료 ***");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 아이돌 퇴장 -> 세션 삭제
     */
    // 나가기 시 저장되어있던 세션 아이디로 -> 퇴장

    @PostMapping("/memeber/fansigns/exit/{memberFansignId}")
    public ResponseEntity<String> memberExitByulZari(@PathVariable("memberFansignId") String memberFansignId,
                                                     @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // 여기 원래 sessionId 받아오는 거였는데 그냥 memberFansignId 받아와서 이렇게 바꿔도 ㄱㅊ 하지요 ;; ?


        log.info("*** 아티스트 :: 퇴장 메서드 호출 ***");

        /**
         *   서비스단의 관리 필요
         */

        String fanSessionId =
        redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId)));
        String watingRoomFansignSession =
                redisService.getValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId)));
        Session fansignSession = openvidu.getActiveSession(fanSessionId);
        Session waitingRoomSession = openvidu.getActiveSession(watingRoomFansignSession);

        if (fansignSession == null) { // 방이 없는 경우
            log.info("*** " + fanSessionId + "번 팬싸인회 방이 없음 ***");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (waitingRoomSession == null) { // 방이 없는 경우
            log.info("*** " + fanSessionId + "번 대기방이 없음 ***");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        fansignSession.close();
        waitingRoomSession.close();
        redisService.deleteValues("memberFansignSession".concat(String.valueOf(memberFansignId)));
        redisService.deleteValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId)));

        log.info("*** 아티스트 :: 퇴장 완료 ***");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}