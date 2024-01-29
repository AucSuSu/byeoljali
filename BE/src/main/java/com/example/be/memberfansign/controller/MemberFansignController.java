package com.example.be.memberfansign.controller;

import com.example.be.artistfansign.dto.AddArtistFansignRequestDto;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.artistfansign.service.ArtistFansignService;
import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.memberfansign.dto.MemberFansignResponseDto;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberFansignController {

    private final MemberFansignRepository memberFansignRepository;

    @GetMapping("/api/memberfansign/{memberfansignId}")
    public ResponseEntity<Message> addFansign(@PathVariable("memberfansignId") Long memberfansignId) {
        log.info(" ** 멤버팬싸인회 상세보기 요청 api 입니다.** ");
        MemberFansignResponseDto memberFansignResponseDto = memberFansignRepository.getMemberfansignDetail(memberfansignId);
        if(memberFansignResponseDto == null) {
            Message message = new Message(HttpStatusEnum.INTERNAL_SERER_ERROR, "조회 실패", memberFansignResponseDto);
            return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
        }
        Message message = new Message(HttpStatusEnum.OK, "조회 완료", memberFansignResponseDto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
