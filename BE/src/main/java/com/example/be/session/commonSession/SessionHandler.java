package com.example.be.session.commonSession;
import java.util.*;
import com.example.be.config.WebSocketConfig;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;

@Component
@Slf4j
public class SessionHandler extends TextWebSocketHandler {
    ObjectMapper objectMapper = new ObjectMapper();
    private static List<WebSocketSession> list = new ArrayList<>();
    FansignRepository repository = new FansignRepository();
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        log.info(" 입장 " + session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        BroadCastMessage chatMessage = objectMapper.readValue(payload, BroadCastMessage.class);
        CommonSession chatRoom = repository.getChatRoom(chatMessage.getChatRoomId());
        chatRoom.handleMessage(session, chatMessage, objectMapper);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info(" 퇴장 " + session);
        list.remove(session);
    }
}
