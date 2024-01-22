package com.example.BE.artistfansign.controller;

import com.example.BE.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.BE.artistfansign.entity.ArtistFansign;
import com.example.BE.artistfansign.service.ArtistFansignService;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import com.example.BE.fan.dto.FanMyPageResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ArtistFansignController {

    ArtistFansignService artistFansignService;

    @PostMapping("/artists/fansign")
    public ResponseEntity<Message> addFansign(@RequestBody AddArtistFansignRequestDto requestDto) {
        Long aritstFansignId = artistFansignService.addFansign(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "성공", aritstFansignId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
