package com.example.be.fan.controller;


import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.service.FanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class FanController
{

    private final FanService fanService;
    /**
     * 팬 마이페이지 조회 하기
     */
    @GetMapping("/api/mypage/{fanId}")
    public ResponseEntity<Message> mypage(@PathVariable("fanId") Long id){
        FanMyPageResponseDto dto = fanService.findById(id);
        Message message = new Message(HttpStatusEnum.OK, "성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/api/mypage/edit/profile")
    public ResponseEntity<Message> update(FanMyPageUpdateRequestDto requestDto){
        Long fanId = fanService.update(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "팬 상세 정보 수정 성공", fanId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/api/mypage/edit/certImage")
    public ResponseEntity<Message> updateCertificationImage(@Param("image") MultipartFile certImage){
        int count = fanService.updateCertificationImageUrl(certImage);
        Message message = new Message(HttpStatusEnum.OK, "인증 사진 수정 성공", count);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 블랙리스트 등록
    @PostMapping("/api/blacklist/{id}")
    public ResponseEntity<Message> addBlacklist(@PathVariable("id") Long id){
        Long fanId = fanService.addBlacklist(id);
        Message message = new Message(HttpStatusEnum.OK, "블랙리스트 추가 완료", fanId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}