package com.example.be.session.service;

import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.scheduling.repository.SchedulingRepository;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Component // 등록
@RequiredArgsConstructor
@Slf4j
public class SessionService {

    // openvidu에 session 발급 요청하고 redis에 저장하는 서비스 입니다.

    private final RedisService redisService;
    private final OpenVidu openVidu;
    private final SessionRepository sessionRepository;
    private final SchedulingRepository schedulingRepository;


    @Scheduled(cron = "00 00 00 * * ?") // 매일 00:00:00 에
    @Transactional
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
         * 5. 멤버 팬싸인회의 리스트 -> 에서 아티스트 팬싸인회 집합(set) 구하기
         * 5-1) set 사용하기
         * 6. 아티스트 팬싸인회 집합을 돌면서 해당 아티스트 팬싸인회 status -> session_connected 상태로 변경해주기
         */

        // 1.
        List<MemberFansign> list =
        sessionRepository.getMemberFansignList(now);

        // artistId (status를 session_created로 바꿔줘야할) set
        HashSet<Long> artistSet = new HashSet<>();

        // 2.
        for(MemberFansign mf : list){
            Long memberFansignId = mf.getMemberfansignId();
            artistSet.add(mf.getArtistFansign().getArtistfansignId());

            Map<String, Object> param = new HashMap<>(); // 이거 어떻게 다르게 쓰는지 조사좀 ^^&.. 해야할 듯
            SessionProperties propertiesFansign = SessionProperties.fromJson(param).build();
            Session fansignSession = openVidu.createSession(propertiesFansign); // 개설
            SessionProperties propertiesWaitingRoom = SessionProperties.fromJson(param).build();
            Session waitingRoomSession = openVidu.createSession(propertiesWaitingRoom); // 개설

            /**
             * 개설되면 memberFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
             * 개설되면 watingRoomFansignSession + memberFansignId key, sessionId를 value로 redis에 sessionId 저장
             */

            redisService.setValues("memberFansignSession".concat(String.valueOf(memberFansignId)), fansignSession.getSessionId());
            redisService.setValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId)), waitingRoomSession.getSessionId());
            log.info("*** 개설 세션 아이디 ***" + redisService.getValues("memberFansignSession".concat(String.valueOf(memberFansignId))));
            log.info("*** 개설 세션 아이디 ***" + redisService.getValues("watingRoomFansignSession".concat(String.valueOf(memberFansignId))));
        }


        for(Long artistFansignId : artistSet){
            schedulingRepository.updateStatusToSessionConnected(artistFansignId);
        }
    }
}
