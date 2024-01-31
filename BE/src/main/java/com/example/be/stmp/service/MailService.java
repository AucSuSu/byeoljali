package com.example.be.stmp.service;

import com.example.be.stmp.dto.MailDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    public void sendWinningMail(MailDto mailInfo){

        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
        String title = "[당첨]" + mailInfo.getArtistFansignName();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, false, "UTF-8");
            mimeMessageHelper.setText(mailInfo.getRecieverMail());
            mimeMessageHelper.setSubject(mailInfo.getArtistFansignName()); // 제목
            mimeMessageHelper.setText(); // 본문 내용
            javaMailSender.send(mimeMailMessage);
        }catch (MessagingException e){
            log.info("message 전송 fail");

        }
    }
}
