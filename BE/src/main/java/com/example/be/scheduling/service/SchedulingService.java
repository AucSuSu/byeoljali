package com.example.be.scheduling.service;

import com.example.be.memberfansign.dto.MemberFansignInfoDto;
import com.example.be.scheduling.repository.SchedulingRepository;
import com.example.be.stmp.service.MailService;
import com.example.be.winning.dto.WinningDto;
import com.example.be.winning.dto.WinningInsertDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component // 등록
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SchedulingService {

    // Redis 연결 서버
    private final SchedulingRepository schedulingRepository;
    // mailService
    private final MailService mailService;

    @Scheduled(cron = "00 00 00 * * ?") // 매일 00:00:00 에 응모 시작 상태로 변경하기
    public void startApplyingStatusCheck() {

        /**
         * 응모 시작인 애들 체크하기
         * 1. DB로 가서 응모 시작 날짜가 오늘인 것들을 다 가져오고, 변경감지로 status다 바꿔주기
         */

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        schedulingRepository.updateStatusToApplying(formattedDate);

    }

    @Scheduled(cron = "30 52 15 * * ?") // 매일 23:59:59 에 응모 마감 닫기
    public void endApplyingStatusCheck() {

        /**
         * 응모 마감인 애들 체크하고 당첨자 선정하기
         * 1. DB로 가서 응모 마감 날짜가 오늘인 것들을 다 가져오고
         * 2. join query 사용해서 mode에 따라 당첨자 선정
         * 3. insert bulk 활용하기
         */

        // 현재 당첨자를 뽑아야 하는 모든 팬싸인회의 당첨자들 목록
        List<WinningInsertDto> insertWinnersList = new ArrayList<>();

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        // 현재 당첨자를 뽑아야 하는 모든 팬싸인회의 당첨자들 목록
        List<MemberFansignInfoDto> list =
        schedulingRepository.getMemberFansignList(formattedDate);

        // 현재 당첨자를 뽑아야 하는 멤버 팬싸인회 하나에 해당하는 당첨자들 목록
        List<WinningDto> winnerListForOneMemberFansign = new ArrayList<>();

        for(MemberFansignInfoDto dto : list){

            winnerListForOneMemberFansign =
            schedulingRepository.getWinningInsertDto(dto.getMemberfansignId(), dto.getMode());

            for(int i = 0; i < winnerListForOneMemberFansign.size(); i++){
                WinningDto winningDto = winnerListForOneMemberFansign.get(i);
                WinningInsertDto winningInsertDto = new WinningInsertDto();
                insertWinnersList.add(winningInsertDto.makeDto(winningDto, i+1));
            }

        }

        // insert
        int batchCount =
        schedulingRepository.insertWinner(insertWinnersList);


        log.info("*** insert 완료 batchCount -> " + batchCount);

        mailService.sendMail(insertWinnersList);

        // 응모 마감으로 상태 바꿔주기
        schedulingRepository.updateStatusToEndApply(formattedDate);
    }

    @Scheduled(cron = "00 00 * * * ?") // 매일 매시간 00분 00초
    public void startFansign() {

        /**
         * 팬싸인회 시작 상태로 변경하기
         */

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH");
        String formattedDate = date.format(formatter);

        schedulingRepository.updateStatusToFansign(formattedDate);

    }
}