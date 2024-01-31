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
    @GetMapping("/api/test/schedule")
    public String schedulTest(){
        schedulingService.endApplyingStatusCheck();
        return "good";
    }

}
