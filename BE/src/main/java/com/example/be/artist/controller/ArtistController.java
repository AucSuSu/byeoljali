package com.example.be.artist.controller;

import com.example.be.artist.dto.ArtistMemberAddRequestDto;
import com.example.be.artist.dto.ArtistMypageResponseDto;
import com.example.be.artist.dto.ArtistSignUpDto;
import com.example.be.artist.dto.SignUpResponseDto;
import com.example.be.artist.service.ArtistService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/artists")
@RequiredArgsConstructor
@Slf4j
public class ArtistController {

    private final ArtistService artistService;

    @PostMapping("/signUp")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody ArtistSignUpDto dto){
        SignUpResponseDto responseDto = artistService.signUp(dto);

        return ResponseEntity.ok(responseDto);
    }
    // 아티스트 마이페이지 조회
    @GetMapping("/{artistId}")
    public ResponseEntity<Message> mypage(@PathVariable("artistId") Long id){
        log.info("*** 아티스트 마이페이지 조회 ***");
        ArtistMypageResponseDto dto = artistService.findById(id);
        Message message = new Message(HttpStatusEnum.OK, "읽어오기 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 멤버 추가하기
    @PostMapping("/members")
    public ResponseEntity<Message> addMember(@RequestBody ArtistMemberAddRequestDto requestDto) {
        log.info("*** 아티스트 멤버 추가하기 ***");
        Long memberId =
                artistService.addMember(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "회원 추가 성공", memberId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    // 아티스트 프로필 이미지 변경

    @PutMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String updateImage(@RequestParam(value = "image") MultipartFile image){
        return artistService.updateImage(image);
    }

}
