package com.example.be.controller;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
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
    // Redis 연결 서버
     private final RedisService redisService;
     private final OpenVidu openVidu;

    @GetMapping("/fansign/{memberFansignId}")
    public ResponseEntity<String> makeByulZari(@PathVariable("memberFansignId") Long memberFansignId)
            throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("*** 팬싸방, 대기방 개설 메소드 호출됨 *** ");
        /**
         * 총 두개의 방(팬싸방, 대기방)을 만들어야함
         */
        Map<String, Object> param = new HashMap<>(); // 이거 어떻게 다르게 쓰는지 조사좀 ^^&.. 해야할 듯
        SessionProperties propertiesFansign = SessionProperties.fromJson(param).build();
        Session fansignSession = openVidu.createSession(propertiesFansign);
        SessionProperties propertiesWaitingRoom = SessionProperties.fromJson(param).build();
        Session waitingRoomSession = openVidu.createSession(propertiesWaitingRoom);
        /**
         * 개설되면 memberFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
         * 개설되면 watingRoomFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
         * 1. 만료 시간은 어떻게 할까 ?
         */
        redisService.setValues("memberFansignSession".concat(String.valueOf(memberFansignId)), fansignSession.getSessionId());
        redisService.setValues("waitingRoomFansignSession".concat(String.valueOf(memberFansignId)), waitingRoomSession.getSessionId());
        // db에 팬싸인회 - 세션 아이디 저장
        // return new ResponseEntity<>(fansignSession.getSessionId(), HttpStatus.OK); // 방 연결
        return new ResponseEntity<>(redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId))), HttpStatus.OK); // 방 연결
    }


    // 대기방 세션아이디, 토큰 발급하기
    @GetMapping("/fan/fansigns/enterwaiting/{memberFansignId}")
    public ResponseEntity<Message> enterByulZariWaiting(@PathVariable("memberFansignId") Long memberFansignId
                                                      )
            throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, Object> params = new HashMap<>();
        log.info("*** 대기방 입장 메서드 호출 ***");

        String watingRoomFansignSessionId =
                redisService.getValues("waitingRoomFansignSession".concat(String.valueOf(memberFansignId)));
        Session waitingRoomSession = openVidu.getActiveSession(watingRoomFansignSessionId);
        if (waitingRoomSession == null) { // 방이 없는 경우
            log.info("*** " + watingRoomFansignSessionId + "번방이 없음 ***");
            Message msg = new Message(HttpStatusEnum.NOT_FOUND, "sessionId 찾기 실패", new SessionEnterResponseDto(null, null));
            return new ResponseEntity<>(msg, HttpStatus.OK);

        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = waitingRoomSession.createConnection(properties);
        log.info("*** 대기방 입장 완료***");

        Message msg = new Message(HttpStatusEnum.OK, "대기방 입장 허가", new SessionEnterResponseDto(watingRoomFansignSessionId, connection.getToken()));
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    // 팬싸방 세션아이디, 토큰 발급하기
    @GetMapping("/fan/fansigns/enterFansign/{memberFansignId}")
    public ResponseEntity<Message> enterByulZariEntering(@PathVariable("memberFansignId") Long memberFansignId
                                                      )
            throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, Object> params = new HashMap<>();
        log.info("*** 팬싸인회 입장 메서드 호출 ***");

        String FansignSessionId =
                redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId)));
        Session FansignSession = openVidu.getActiveSession(FansignSessionId);
        if (FansignSession == null) { // 방이 없는 경우
            log.info("*** " + FansignSessionId + " 방이 없음 ***");
            Message msg = new Message(HttpStatusEnum.NOT_FOUND, "sessionId 찾기 실패", new SessionEnterResponseDto(null, null));
            return new ResponseEntity<>(msg, HttpStatus.OK);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = FansignSession.createConnection(properties);
        log.info("*** 팬싸인회 입장 완료***");

        Message msg = new Message(HttpStatusEnum.OK, "팬싸인회 입장 허가", new SessionEnterResponseDto(FansignSessionId, connection.getToken()));
        return new ResponseEntity<>(msg, HttpStatus.OK);
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

        Session session = openVidu.getActiveSession(sessionId);
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
                redisService.getValues("waitingRoomFansignSession".concat(String.valueOf(memberFansignId)));
        Session fansignSession = openVidu.getActiveSession(fanSessionId);
        Session waitingRoomSession = openVidu.getActiveSession(watingRoomFansignSession);

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
        redisService.deleteValues("waitingRoomFansignSession".concat(String.valueOf(memberFansignId)));

        log.info("*** 아티스트 :: 퇴장 완료 ***");
        return new ResponseEntity<>(HttpStatus.OK);
    }
}