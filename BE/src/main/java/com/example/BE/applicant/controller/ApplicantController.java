package com.example.BE.applicant.controller;

import com.example.BE.applicant.dto.ApplyPageDto;
import com.example.BE.applicant.repository.ApplicantRepository;
import com.example.BE.applicant.service.ApplicantService;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ApplicantController {

    private final ApplicantService applicantService;

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
