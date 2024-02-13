package com.example.be.artistfansign.controller;

import com.example.be.artistfansign.dto.*;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.artistfansign.service.ArtistFansignService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ArtistFansignController {

    private final ArtistFansignService artistFansignService;

    @PostMapping(value = "/api/artists/fansign", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Message> addFansign(AddArtistFansignRequestDto requestDto, @RequestParam(value = "image") MultipartFile image) {
        log.info(" ** 팬싸인회 생성 요청 api 입니다.** ");
        log.info(" requestDto -> " + requestDto);
        Long aritstFansignId = artistFansignService.addFansign(requestDto, image);
        Message message = new Message(HttpStatusEnum.OK, "개설 완료", aritstFansignId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

//    @PostMapping(value = "/api/artists/fansign/test/{}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<Message> addFansign(AddArtistFansignRequestDto requestDto) {
//        log.info(" ** 팬싸인회 생성 요청 api 입니다.** ");
//        log.info("requestDto")
//        Long aritstFansignId = artistFansignService.addFansign(requestDto);
//        Message message = new Message(HttpStatusEnum.OK, "개설 완료", aritstFansignId);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }

    @GetMapping("/api/mainpage/recent")
    public ResponseEntity<Message> recentFansign() {
        log.info(" ** 최근 팬싸인회 리스트 api 입니다.** ");
        List<RecentFansignResponseDto> recentFansign = artistFansignService.getRecent6Fansign();
        Message message = new Message(HttpStatusEnum.OK, "최근 개설된 팬싸인회 top 6 ", recentFansign);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/api/mainpage")
    public ResponseEntity<Message> allFansign(
                                              @Param("searchKeyword") String searchKeyword,
                                              @Param("order") String order,
                                              @Param("status")FansignStatus status) {
        // 내가 응모했는지에 대한 정보가 필요함
        log.info(" ** 팬싸인회 리스트 api 입니다.** ");
        List<FansignResponseDto> fansignList = artistFansignService.getFansign(searchKeyword, order, status);
        Message message = new Message(HttpStatusEnum.OK, "팬싸인회", fansignList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/api/artists/apply")
    public ResponseEntity<Message> ArtistsFansignList(@Param("status")FansignStatus status) {
        log.info(" ** 아티스트 마이페이지 팬싸인회 관리 api 입니다.** ");
        List<ArtistsMyFansignResponseDto> fansignList = artistFansignService.getArtistsFansign(status);
        Message message = new Message(HttpStatusEnum.OK, "아티스트 조회 팬싸인회", fansignList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/api/artists/fansignCount/{artistId}")
    public ResponseEntity<Message> getMemberFansignCount(@PathVariable("artistId") Long artistId){
        log.info(" *** 아티스트 마이페이지 팬싸인회 개수 가져오기 api 입니다. *** ");
        FansignGroupByStatusCountResponseDto result = artistFansignService.getFansignCount(artistId);
        Message message = new Message(HttpStatusEnum.OK, "아티스트 조회 맴버 팬싸인회 개수", result);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
