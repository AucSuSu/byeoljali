package com.example.be.stmp.service;

import com.example.be.stmp.dto.MailDto;
import com.example.be.winning.dto.WinningDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;

    public void sendMail(List<WinningDto> list){

        log.info(" *** 메일 전송 입니다 *** ");
        for(WinningDto dto : list){
            // dto -> MailDto
//            sendWinningMail(new MailDto(dto.getEmail(),
//                    dto.getTitle(), dto.getStartFansignTime(), dto.getName(),
//                    dto.getOrders()));
        }
    }

    public void sendWinningMail(MailDto mailInfo){

        log.info(" *** 메일 전송 to *** " + mailInfo.getArtistFansignName() + " -> " + mailInfo.getRecieverMail());
        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
        String title = "[당첨] : " + mailInfo.getArtistFansignName() + " 당첨 안내";
        String content = "[당첨] : " + mailInfo.getArtistFansignName() + " 당첨 안내" + "\n" +
                "당첨 축하드립니다." + "\n" +
                "일시 : " + mailInfo.getStartFansignTime();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, false, "UTF-8");
            mimeMessageHelper.setText(mailInfo.getRecieverMail());
            mimeMessageHelper.setSubject(title); // 제목
            mimeMessageHelper.setText(content); // 본문 내용
            javaMailSender.send(mimeMailMessage);
        }catch (MessagingException e){
            log.info("message 전송 fail");
        }
    }
}
