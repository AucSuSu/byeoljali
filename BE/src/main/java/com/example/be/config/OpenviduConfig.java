package com.example.be.config;

import io.openvidu.java.client.OpenVidu;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
@RequiredArgsConstructor
@Configuration
@Slf4j
public class OpenviduConfig {

    @Value("${spring.openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${spring.openvidu.secret}")
    private String OPENVIDU_SECRET;

    @Bean
    public OpenVidu openVidu() {
        log.info("openvidu 연결 테스트 -> " + OPENVIDU_URL + "(" + OPENVIDU_SECRET + ")");
        return new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

}
