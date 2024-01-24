package com.example.be.session.service;

import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.session.repository.SessionRepository;
import com.example.be.config.redis.RedisService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component // 등록
@RequiredArgsConstructor
@Slf4j
public class SessionService {

    // Redis 연결 서버
    private final RedisService redisService;

    // Bean 등록하면 지우기 ^^&
    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openviduService;

    @PostConstruct
    public void init() {
        this.openviduService = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }
    // 여기까지
    private final SessionRepository sessionRepository;

    @Scheduled(cron = "00 00 14 * * ?") // 매일 00:00:00 에
    public void makeByulZari()
            throws OpenViduJavaClientException, OpenViduHttpException {

        log.info("*** 팬싸방, 대기방 개설 메소드 호출됨 (매일 00시 00분 00초에 실행) *** ");
        LocalDateTime now = LocalDateTime.now();

        /**
         * 총 두개의 방(팬싸방, 대기방)을 만들어야함
         * 1. DB에서 현재 날짜와 팬싸인회 시작날짜가 같은 레코드를 찾음
         * 2. 해당 레코드의 memberFansignId를 가져옴
         * 3. session 을 두개 발급 받음
         * 4. Redis에 저장함 !
         * 4-1) redis-cli 에서 확인하기
         */

        // 1.
        List<MemberFansign> list =
        sessionRepository.getMemberFansignList(now);

        // 2.
        for(MemberFansign mf : list){
            Long memberFansignId = mf.getMemberfansignId(); // 예시 데이터

            Map<String, Object> param = new HashMap<>(); // 이거 어떻게 다르게 쓰는지 조사좀 ^^&.. 해야할 듯
            SessionProperties propertiesFansign = SessionProperties.fromJson(param).build();
            Session fansignSession = openviduService.createSession(propertiesFansign); // 개설
            SessionProperties propertiesWaitingRoom = SessionProperties.fromJson(param).build();
            Session waitingRoomSession = openviduService.createSession(propertiesWaitingRoom); // 개설

            /**
             * 개설되면 memberFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
             * 개설되면 watingRoomFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
             */

            redisService.setValues("memberFansignSession".concat(String.valueOf(memberFansignId)), fansignSession.getSessionId());
            redisService.setValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId)), waitingRoomSession.getSessionId());
            log.info("*** 읽기 ***" + redisService.getValues("1"));
            log.info("*** 개설 세션 아이디 ***" + redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId))));
            log.info("*** 개설 세션 아이디 ***" + redisService.getValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId))));
        }
    }
}
