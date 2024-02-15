package com.example.be.stmp.service;

import com.example.be.stmp.dto.MailDto;
import com.example.be.winning.dto.WinningInsertDto;
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

    public void sendMail(List<WinningInsertDto> list){

        log.info(" *** 메일 전송 입니다 *** ");

        for(WinningInsertDto dto : list){
            // dto -> MailDto
            //System.out.println(dto);
            sendWinningMail(new MailDto(dto.getEmail(),
                    dto.getTitle(), dto.getStartFansignTime(), dto.getName(),
                    dto.getOrders()));
        }
    }

    public void sendWinningMail(MailDto mailInfo){

        log.info(" *** 메일 전송 to *** " + mailInfo.getArtistFansignName() + " -> " + mailInfo.getRecieverMail());
        MimeMessage mimeMailMessage = javaMailSender.createMimeMessage();
        String title = "[별자리] " + mailInfo.getArtistFansignName() + " 응모 결과 안내";
//        String imagePath = // 여기 사용할 이미지 url 넣기
        String content = "<html><body>"
                + "<p>안녕하세요.</p>"
                + "<p> <strong>스타와 팬이 만나는 영상 팬싸인회 플랫폼 별자리</strong>입니다.</p>"
                + "<p>고객님께서 응모하신 <strong>[" + mailInfo.getArtistFansignName() + "]</strong>의 멤버 : <strong>[" + mailInfo.getMembername() + "]</strong> 응모에 관심을 가져주셔서 진심으로 감사드립니다.</p>"
                + "<p>추첨 결과 고객님은 <span style='font-size: 18px; color: #1a8cff;'><strong>당첨</strong></span> 되었다는 사실을 안내드립니다.</p>"
                + "<br>"
                + "<h3>일정 안내</h3>"
                + "<p>일시: <strong>" + mailInfo.getStartTime() + "</strong></p>"
                + "<br>"
                + "<p>자세한 사항은 <a href='https://i10e104.p.ssafy.io'>별자리</a> 홈페이지에서 확인해 주시기 바랍니다.</p>\n"
                + "<p>저희 별자리 서비스를 이용해 주셔서 감사드립니다</p>"
//                + "<img src='" + imagePath + "' alt='Image Description' style='width: 100%; max-width: 600px; height: auto;'>"
                + "</body></html>";

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMailMessage, false, "UTF-8");
            mimeMessageHelper.setTo(mailInfo.getRecieverMail());
            mimeMessageHelper.setSubject(title); // 제목
            mimeMessageHelper.setText(content, true); // 본문 내용
            javaMailSender.send(mimeMailMessage);
        }catch (MessagingException e){
            log.info("message 전송 fail");
        }
    }
}
