package com.example.be.scheduling.controller;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.scheduling.repository.SchedulingRepository;
import com.example.be.scheduling.service.SchedulingService;
import com.example.be.scheduling.service.SessionService;
import io.openvidu.java.client.OpenViduException;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class SchedulingController {

    private final SchedulingService schedulingService;
    private final SessionService sessionService;

    // 팬싸인회 마감
    @PutMapping("/api/fansign/close")
    public ResponseEntity<Message> closeFansign(){
        schedulingService.endFansign();
        Message message = new Message(HttpStatusEnum.OK, "팬싸인회 close", null);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 팬싸인회 당첨 강제롤 일단 시키기
    @GetMapping("/api/test/schedule")
    public String schedulTest(){
        schedulingService.endApplyingStatusCheck();
        return "good";
    }

    // 일단 강제로 팬싸인회 상태 바꿀수 있게 하기
    @GetMapping("/api/startApplying")
    public void startApplying(){
        schedulingService.startApplyingStatusCheck();
    }

    // 지금 READY_FANSIGN인 팬싸인회 중 오늘 팬싸인 시작인 팬싸인회의 세션 발급 -> SESSION_CONNECTED로 바꾸기
    @GetMapping("/api/sessionConnect")
    public void getSession(){
        try{
            sessionService.makeByulZari();
        }catch (OpenViduException ex){
            log.info(" *** openvidu error *** ");
        }
    }

}
