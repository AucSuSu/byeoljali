package com.example.BE.applicant.controller;

import com.example.BE.applicant.service.ApplicantService;
import com.example.BE.applicant.dto.ApplyFormRequestDto;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
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

    // 응모 전체 페이지 조회하기
//    @GetMapping("/applyPage/{id}")
//    public ResponseEntity<Message> applyPage(@PathVariable("id") Long id){
//        ApplyPageDto dto = applicantService.findById(id);
//        Message message = new Message(HttpStatusEnum.OK, "성공", dto);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    // 응모 상세 페이지 조회하기

    // 필터 기능 - 멤버별
}