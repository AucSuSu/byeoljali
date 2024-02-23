package com.example.be.scheduling.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class SchedulingServiceTest {

    @Autowired
    SchedulingService schedulingService;

    @Test
    @Transactional
    public void 팬싸인회당첨로직_성능테스트(){

        schedulingService.endApplyingStatusCheck();
    }

}