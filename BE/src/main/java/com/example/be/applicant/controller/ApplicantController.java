package com.example.be.applicant.controller;

import com.example.be.applicant.dto.*;
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

    // 응모 폼을 위해 프론트에 전달하기
    @GetMapping("/api/mainpage/makeApplyForm/{artistfansign_id}")
    public ResponseEntity<Message> makeApplyForm(@PathVariable("artistfansign_id") Long artistfansign_id){
        log.info(" ** 응모 폼을 구성할 내용을 제공하는 api 입니다 ** ");
        ApplyFormResponseDto dto = applicantService.makeApplyForm(artistfansign_id);
        Message message = new Message(HttpStatusEnum.OK, "응모폼 만들기 전송 완료", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 응모 폼 제출
    @PostMapping("/api/mainpage/{artistfansign_id}")
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

    // 응모 내역 페이지 조회하기 - 응모된 거 안된거 - 안써서 지움
//    @GetMapping("/api/applyPage")
//    public ResponseEntity<Message> applyPage(){
//        log.info(" ** 응모 내역 팬 페이지 조회 api 입니다 ** ");
//        List<ApplyPageDto> dto = applicantService.findAllApplyPageById();
//        Message message = new Message(HttpStatusEnum.OK, "응모 내역 페이지 전체 출력 성공", dto);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    // 응모 내역 페이지 - 응모 중인 것만 !!!!
    @GetMapping("/api/applyPage/{isWon}")
    public ResponseEntity<Message> onlyAppliedList(
                                                   @PathVariable("isWon") boolean isWon){
        log.info(" ** 응모 내역 팬 페이지 조회 api 입니다 ** ");
        List<SeparatedApplyPageDto> dto = applicantService.findAllApplyPageById2(isWon);

        String str = isWon?"당첨된 ":"응모 중인 ";
        Message message = new Message(HttpStatusEnum.OK, str+"팬싸 내역 페이지 출력 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


    // 응모 상세 페이지 조회하기 - 팬싸인회 정보 보여주기
    @GetMapping("/api/applyPage/detail/{memberfansignId}")
    public ResponseEntity<Message> applyDetail(@PathVariable("memberfansignId") Long memberfansignId){
        log.info(" ** 응모 상세 페이지 조회 api 입니다 ** ");
        ApplyPageDetailDto dto = applicantService.getDetailApplyFansign(memberfansignId);
        Message message = new Message(HttpStatusEnum.OK, "응모 팬싸 상세 조회 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}