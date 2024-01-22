package com.example.BE.artist.controller;

import com.example.BE.artist.dto.ArtistMemberAddRequestDto;
import com.example.BE.artist.dto.ArtistMypageResponseDto;
import com.example.BE.artist.service.ArtistService;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import com.example.BE.fan.dto.FanMyPageResponseDto;
import com.example.BE.fan.dto.FanMyPageUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ArtistController
{

    private final ArtistService artistService;

    // 아티스트 마이페이지 조회
    @GetMapping("/artists/{artistId}")
    public ResponseEntity<Message> mypage(@PathVariable("artistId") Long id){
        ArtistMypageResponseDto dto = artistService.findById(id);
        Message message = new Message(HttpStatusEnum.OK, "읽어오기 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 멤버 추가하기
    @PostMapping("/artists/members")
    public ResponseEntity<Message> addMember(@RequestBody ArtistMemberAddRequestDto requestDto) {
        Long memberId =
        artistService.addMember(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "회원 추가 성공", memberId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }



}