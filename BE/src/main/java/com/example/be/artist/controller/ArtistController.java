package com.example.be.artist.controller;

import com.example.be.artist.dto.*;
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

import java.util.List;

@RestController
@RequestMapping("/api/artists")
@RequiredArgsConstructor
@Slf4j
public class ArtistController {

    private final ArtistService artistService;

    // 메인페이지 모든 아티스트 리스트 조회
    @GetMapping("/showall")
    public ResponseEntity<Message> allArtists() {
        log.info(" ** 아티스트 리스트 조회 api 입니다.** ");
        List<ArtistsResponseDto> artistList = artistService.getArtists();
        Message message = new Message(HttpStatusEnum.OK, "모든 아티스트 리스트", artistList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<SignUpResponseDto> signUp(@RequestBody ArtistSignUpDto dto){
        SignUpResponseDto responseDto = artistService.signUp(dto);

        return ResponseEntity.ok(responseDto);
    }
    // 아티스트 마이페이지 조회 -
    @GetMapping("/")
    public ResponseEntity<Message> mypage(){
        log.info("*** 아티스트 마이페이지 조회 ***");
        ArtistMypageResponseDto dto = artistService.getMyPage();
        Message message = new Message(HttpStatusEnum.OK, "읽어오기 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    //
    @GetMapping("/{artistId}")
    public ResponseEntity<Message> mypage(@PathVariable("artistId") Long artistId){
        log.info("*** 아티스트 마이페이지 조회 ***");
        ArtistMypageResponseDto dto = artistService.getMyPage(artistId);
        Message message = new Message(HttpStatusEnum.OK, "읽어오기 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 멤버 추가하기
    @PostMapping(value = "/members", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> addMember(ArtistMemberAddRequestDto requestDto, @RequestParam(value = "image") MultipartFile image) {
        log.info("*** 아티스트 멤버 추가하기 ***");
        Long memberId =
                artistService.addMember(requestDto, image);
        Message message = new Message(HttpStatusEnum.OK, "회원 추가 성공", memberId);
        return new ResponseEntity<>(message,HttpStatus.OK);
    }

    // 아티스트 프로필 이미지와 로고 이미지 변경
    @PutMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> updateImage(@RequestParam(value = "profileImage", required = false) MultipartFile profileImage, @RequestParam(value = "logoImage", required = false) MultipartFile logoImage){
        String profileImageUrl = null;
        String logoImageUrl = null;

        // 프로필 이미지 업데이트
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = artistService.updateImage(profileImage);
        }

        // 로고 이미지 업데이트
        if (logoImage != null && !logoImage.isEmpty()) {
            logoImageUrl = artistService.updateLogoImage(logoImage);
        }

        // 응답 메시지 구성
        String messageText;
        if (profileImageUrl != null && logoImageUrl != null) {
            messageText = "프로필 이미지와 로고 이미지 변경 성공";
        } else if (profileImageUrl != null) {
            messageText = "프로필 이미지 변경 성공";
        } else if (logoImageUrl != null) {
            messageText = "로고 이미지 변경 성공";
        } else {
            messageText = "변경할 이미지가 없습니다";
        }

        Message message = new Message(HttpStatusEnum.OK, messageText, messageText);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 아티스트 멤버 수정
    @PutMapping(value = "/members/{memberId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> updateMember(@PathVariable("memberId") Long memberId, ArtistMemberRequestDto requestDto, @RequestParam(value = "image", required = false) MultipartFile image){
        Long id = artistService.updateMember(memberId, image, requestDto);
        Message message = new Message(HttpStatusEnum.OK, "아티스트 멤버 정보 수정 성공", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 아티스트 로고들 가져오기
    @GetMapping("/logo")
    public ResponseEntity<Message> getArtistLogoAndName(){
        List<ArtistLogoResponseDto> artistLogos = artistService.mainLogo();
        Message message = new Message(HttpStatusEnum.OK, "아티스트 로고들 조회 완료", artistLogos);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }


}
