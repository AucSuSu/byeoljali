package com.example.be.scheduling.service;

import com.example.be.scheduling.repository.SchedulingRepository;
import com.example.be.session.repository.SessionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component // 등록
@RequiredArgsConstructor
@Slf4j
public class SchedulingService {

    // Redis 연결 서버
    private final SchedulingRepository schedulingRepository;

    @Scheduled(cron = "00 00 00 * * ?") // 매일 00:00:00 에
    public void startApplyingStatusCheck() {

        /**
         * 응모 시작인 애들 체크하기
         * 1. DB로 가서 응모 시작 날짜가 오늘인 것들을 다 가져오고, 변경감지로 status다 바꿔주기
         */


    }

    @Scheduled(cron = "00 00 00 * * ?") // 매일 00:00:00 에
    public void endApplyingStatusCheck() {

        /**
         * 응모 마감인 애들 체크하고 당첨자 선정하기
         * 1. DB로 가서 응모 마감 날짜가 오늘인 것들을 다 가져오고, 변경감지로 status다 바꿔주기
         * 2. join query 사용해서 mode에 따라 당첨자 선정
         * 3. insert bulk 활용하기
         */

    }
}