package com.example.be.smtp;

import com.example.be.smtp.dto.MailDto;
import com.example.be.smtp.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @GetMapping("/send/stmp")
    public String sendMailTest(){
        mailService.sendWinningMail(new MailDto("ww71er@naver.com", "arimFansign", LocalDateTime.now(), "arim", 1));
        return "good";
    }
}
