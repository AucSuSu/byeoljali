package com.example.be.artist.controller;

import com.example.be.artist.dto.*;
import com.example.be.artist.service.ArtistService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/artists")
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
    @GetMapping("/")
    public ResponseEntity<Message> mypage(){
        log.info("*** 아티스트 마이페이지 조회 ***");
        ArtistMypageResponseDto dto = artistService.getMyPage();
        Message message = new Message(HttpStatusEnum.OK, "읽어오기 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 멤버 추가하기
    @PostMapping(value = "/members", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> addMember(ArtistMemberAddRequestDto requestDto, @RequestParam(value = "image") MultipartFile image) {
        log.info("*** 아티스트 멤버 추가하기 ***");
        System.out.println(requestDto.getName());
        Long memberId =
                artistService.addMember(requestDto, image);
        Message message = new Message(HttpStatusEnum.OK, "회원 추가 성공", memberId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }


    // 아티스트 프로필 이미지 변경

    @PutMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> updateImage(@RequestParam(value = "image") MultipartFile image){
        String s = artistService.updateImage(image);
        Message message = new Message(HttpStatusEnum.OK, "프로필 이미지 변경 성공", s);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 아티스트 멤버 수정
    @PutMapping(value = "/members/{memberId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> updateMember(@PathVariable("memberId") Long memberId, ArtistMemberRequestDto requestDto, @RequestParam(value = "image") MultipartFile image){
        Long id = artistService.updateMember(memberId, image, requestDto);
        Message message = new Message(HttpStatusEnum.OK, "아티스트 멤버 정보 수정 성공", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
