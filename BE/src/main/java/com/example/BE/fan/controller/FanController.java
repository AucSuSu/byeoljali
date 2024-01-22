package com.example.BE.fan.controller;

import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import com.example.BE.fan.dto.FanMyPageResponseDto;
import com.example.BE.fan.dto.FanMyPageUpdateRequestDto;
import com.example.BE.fan.service.FanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FanController
{

    private final FanService fanService;

    /**
     * 팬 마이페이지 조회 하기
     */
    @GetMapping("/mypage/{id}")
    public ResponseEntity<Message> mypage(@PathVariable("id") Long id){
        FanMyPageResponseDto dto = fanService.findById(id);
        Message message = new Message(HttpStatusEnum.OK, "성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PutMapping("/mypage/edit/profile/{id}")
    public Long update(@PathVariable("id") Long id,
                       @RequestBody FanMyPageUpdateRequestDto requestDto){
        return fanService.update(id, requestDto);
    }

    @PutMapping("/mypage/edit/certImage/{id}")
    public int updateCertificationImage(@PathVariable("id") Long id,
                                        @RequestBody String certificationImageUrl){
        return fanService.updateCertificationImageUrl(id, certificationImageUrl);
    }

    // 블랙리스트 등록
    @PostMapping("/blacklist/{id}")
    public int addBlacklist(@PathVariable("id") Long id){
        return 1;
    }


}