package com.example.be.scheduling.controller;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.scheduling.repository.SchedulingRepository;
import com.example.be.scheduling.service.SchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SchedulingController {

    private final SchedulingService schedulingService;
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

}
