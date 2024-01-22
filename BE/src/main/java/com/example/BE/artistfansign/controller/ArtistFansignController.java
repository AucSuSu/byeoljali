package com.example.BE.artistfansign.controller;

import com.example.BE.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.BE.artistfansign.service.ArtistFansignService;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ArtistFansignController {

    ArtistFansignService artistFansignService;

    @PostMapping("/artists/fansign")
    public ResponseEntity<Message> addFansign(@RequestBody AddArtistFansignRequestDto requestDto) {
        log.info(" ** 팬싸인회 생성 요청 api 입니다.** ");
        Long aritstFansignId = artistFansignService.addFansign(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "개설 완료", aritstFansignId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
