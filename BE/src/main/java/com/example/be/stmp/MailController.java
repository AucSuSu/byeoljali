package com.example.be.stmp;

import com.example.be.stmp.dto.MailDto;
import com.example.be.stmp.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @GetMapping("/send/stmp")
    public String sendMail(){
        mailService.sendWinningMail(new MailDto("ice_98@naver.com", "아이유 팬싸인회", LocalDateTime.now(), "아이유", 1));
        return "good";
    }
}
