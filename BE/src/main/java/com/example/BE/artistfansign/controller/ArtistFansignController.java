package com.example.BE.artistfansign.controller;

import com.example.BE.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.BE.artistfansign.dto.FansignResponseDto;
import com.example.BE.artistfansign.dto.RecentFansignResponseDto;
import com.example.BE.artistfansign.service.ArtistFansignService;
import com.example.BE.common.HttpStatusEnum;
import com.example.BE.common.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ArtistFansignController {

    private final ArtistFansignService artistFansignService;

    @PostMapping("/artists/fansign")
    public ResponseEntity<Message> addFansign(@RequestBody AddArtistFansignRequestDto requestDto) {
        log.info(" ** 팬싸인회 생성 요청 api 입니다.** ");
        Long aritstFansignId = artistFansignService.addFansign(requestDto);
        Message message = new Message(HttpStatusEnum.OK, "개설 완료", aritstFansignId);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/mainpage/recent")
    public ResponseEntity<Message> recentFansign() {
        log.info(" ** 최근 팬싸인회 리스트 api 입니다.** ");
        List<RecentFansignResponseDto> recentFansign = artistFansignService.getRecent3Fansign();
        Message message = new Message(HttpStatusEnum.OK, "최근 개설된 팬싸인회 top 3 ", recentFansign);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/mainpage/{fanId}")
    public ResponseEntity<Message> allFansign(@PathVariable("fanId") Long fanId) {
        // 내가 응모했는지에 대한 정보가 필요함
        log.info(" ** 팬싸인회 리스트 api 입니다.** ");
        List<FansignResponseDto> fansignList = artistFansignService.getFansign(fanId);
        Message message = new Message(HttpStatusEnum.OK, "팬싸인회", fansignList);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
