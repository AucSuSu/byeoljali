package com.example.be.scheduling.repository;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SchedulingRepositoryImplTest {

    @Autowired
    SchedulingRepository schedulingRepository;

    @Test
    public void status_to_session_connected테스트 () {
        schedulingRepository.updateStatusToSessionConnected(7L);
    }

}