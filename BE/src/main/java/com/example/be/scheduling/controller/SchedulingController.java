package com.example.be.scheduling.controller;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.scheduling.repository.SchedulingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class SchedulingController {

    private final SchedulingRepository schedulingRepository;
    @GetMapping("/api/test/schedule")
    public void schedulTest(){
        schedulingRepository.getWinningInsertDto(4L, FansignMode.RANDOM);
    }

}
