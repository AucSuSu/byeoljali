package com.example.be.winning.controller;


import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.winning.dto.FansignFanResponseDto;
import com.example.be.winning.service.WinningService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class WinningController {

    private final WinningService winningService;
    // 당첨자 - 팬싸인회에 들어있는 팬 정보 가져오기

    @GetMapping("/api/fansigns/{fanId}")
    public ResponseEntity<Message> fanInfo(@PathVariable("fanId") Long fanId) {
        log.info(" ** 팬싸인회 - 팬정보 요청 ** ");
        FansignFanResponseDto dto = winningService.findById(fanId);
        Message message = new Message(HttpStatusEnum.OK, "팬 정보", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

}
