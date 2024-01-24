package com.example.be.config;

import io.openvidu.java.client.OpenVidu;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
@RequiredArgsConstructor
@Configuration
public class OpenviduConfig {

    // 이후에 bean 등록으로 바꾸기 지금은 테스트용 ㅜ.ㅜ

    @Value("${spring.openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${spring.openvidu.secret}")
    private String OPENVIDU_SECRET;

    @Bean
    public OpenVidu openVidu() {
        return new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


}
