package com.example.be.applicant.controller;

import com.example.be.applicant.dto.ApplyFormRequestDto;
import com.example.be.applicant.dto.ApplyPageDetailDto;
import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.applicant.service.ApplicantService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ApplicantController {

    private final ApplicantService applicantService;

    // 응모 폼 제출
    @PostMapping("/mainpage/{artistfansign_id}")
    public ResponseEntity<Message> submitApplyForm(@PathVariable("artistfansign_id") Long artistfansignId,
                                                   @RequestBody ApplyFormRequestDto requestDto){
        // 응모 폼을 제출하면
        // 어떤 멤버인지 memberId, (memberFansign과 연결됨)
        // 응모한 앨범 수 boughtAlbum,
        // 어떤 팬인지 fanId 가
        // applicant에 저장되어야 한다.
        Long applicantId =
                applicantService.submitApplyForm(requestDto);

        Message message = new Message(HttpStatusEnum.OK, "응모폼 제출 완료", applicantId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 응모 내역 페이지 조회하기 - 응모된 거 안된거
    @GetMapping("/applyPage/{fanId}")
    public ResponseEntity<Message> applyPage(@PathVariable("fanId") Long fanId){
        log.info(" ** 응모 내역 팬 페이지 조회 api 입니다 ** ");
        List<ApplyPageDto> dto = applicantService.findAllApplyPageById(fanId);
        Message message = new Message(HttpStatusEnum.OK, "응모 내역 페이지 전체 출력 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 응모 상세 페이지 조회하기 - 팬싸인회 정보 보여주기
//    @GetMapping("/applyPage/detail/{memberfansignId}/{fanId}")
//    public ResponseEntity<Message> applyDetail(@PathVariable("memberfansignId") Long memberfansignId, @PathVariable("fanId") Long fanId){
//        log.info(" ** 응모 상세 페이지 조회 api 입니다 ** ");
//        ApplyPageDetailDto dto = applicantService.getDetailApplyFansign(memberfansignId, fanId);
//        Message message = new Message(HttpStatusEnum.OK, "응모 팬싸 상세보기 성공", dto);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    // 필터 기능 - 멤버별
}