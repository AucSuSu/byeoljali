package com.example.be.config;

import com.example.be.config.redis.RedisService;
import com.example.be.session.commonSession.ChatService;
import com.example.be.session.commonSession.WebSockChatHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import javax.annotation.PostConstruct;

@RequiredArgsConstructor
@Configuration
@EnableWebSocket
@Slf4j
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSockChatHandler sessionHandler;
    private final RedisService redisService;
    private final ChatService chatService;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(sessionHandler, "/socket")
                .setAllowedOrigins("https://i10e104.p.ssafy.io:3000")
                .withSockJS();
    }

    @PostConstruct
    public void makeWebsocketSession(){
        // redis 읽어와서 해야하는데 그게 맞는지 ;;?
    }
}
