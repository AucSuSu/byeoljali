package com.example.be.stmp.service;

import com.example.be.stmp.dto.MailDto;
import com.example.be.winning.dto.WinningDto;
import com.example.be.winning.dto.WinningInsertDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.security.core.context.SecurityContextHolder.setContext;

@Service
@Slf4j
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender javaMailSender;
    @Autowired
    private TemplateEngine htmlTemplateEngine;

    public void sendMail(List<WinningInsertDto> list){

        log.info(" *** 메일 전송 입니다 *** ");

        for(WinningInsertDto dto : list){
            // dto -> MailDto
            System.out.println(dto);
            sendWinningMail(new MailDto(dto.getEmail(),
                    dto.getTitle(), dto.getStartFansignTime(), dto.getName(),
                    dto.getOrders()));
        }
    }

    public void sendWinningMail(MailDto mailInfo){

        log.info(" *** 메일 전송 to *** " + mailInfo.getArtistFansignName() + " -> " + mailInfo.getRecieverMail());
        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();

        // test tmplate
        String title = "[당첨] : " + mailInfo.getArtistFansignName() + " 당첨 안내";
        String content = "[당첨] : " + mailInfo.getArtistFansignName() + " 당첨 안내" + "\n" +
                "당첨 축하드립니다." + "\n" +
                "일시 : " + mailInfo.getStartFansignTime();

        // template
        Context context = new Context();

        Map<String, Object> messageContent = new HashMap<>();
        messageContent.put("fansignTitle", mailInfo.getArtistFansignName());
        messageContent.put("fansignStartTime", mailInfo.getStartFansignTime());
        messageContent.put("orders", mailInfo.getOrders());
        messageContent.put("memberName", mailInfo.getMembername());

        context.setVariables(messageContent);
        String templateMail = htmlTemplateEngine.process("mailTemplate.html", context);
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, false, "UTF-8");
            mimeMessageHelper.setTo(mailInfo.getRecieverMail());
            mimeMessageHelper.setSubject(title); // 제목
            mimeMessageHelper.setText(templateMail, true); // 본문 내용
            javaMailSender.send(mimeMailMessage);
        } catch (MessagingException e){
            log.info("message 전송 fail");
        }
    }
}
