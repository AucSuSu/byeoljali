package com.example.be.artist.controller;

import com.example.be.artist.dto.ArtistMemberAddRequestDto;
import com.example.be.artist.dto.ArtistMypageResponseDto;
import com.example.be.artist.dto.ArtistSignUpDto;
import com.example.be.artist.dto.SignUpResponseDto;
import com.example.be.artist.service.ArtistService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/artist")
@RequiredArgsConstructor
public class ArtistController {
//asdfsadf
    private final ArtistService artistService;

    @PostMapping("/signUp")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody ArtistSignUpDto dto){
        SignUpResponseDto responseDto = artistService.signUp(dto);

        return ResponseEntity.ok(responseDto);
    }
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
