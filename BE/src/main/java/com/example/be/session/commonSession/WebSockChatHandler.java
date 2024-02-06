package com.example.be.session.commonSession;
import java.io.IOException;
import java.util.*;

import com.example.be.exception.SessionClosedException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSockChatHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // 여기서 잡아주는 IllegalStateException은 세션이 닫혔을때 발생하는 에러임
        if(exception instanceof IllegalStateException) {
            throw new SessionClosedException("세션이 닫혔습니다.");
        }
        super.handleTransportError(session, exception);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info(" *** connection complete *** ");
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        ChatRoom room = chatService.findRoomById(chatMessage.getRoomId());
        Set<WebSocketSession> sessions = room.getSessions();   //방에 있는 현재 사용자 한명이 WebsocketSession
        log.info("payload -> "+ payload);
        try {
            if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
                sessions.add(session);
                chatMessage.setMessage(chatMessage.getMessage());
                log.info("*** 입장 확인 완료 *** ");
                sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
                log.info("*** 입장 확인 메세지 전송*** ");
            }else if (chatMessage.getType().equals(ChatMessage.MessageType.QUIT)) {
                sessions.remove(session);
                log.info("*** QUIT CODE *** ");
                chatMessage.setMessage(chatMessage.getMessage());
                sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
            }else if (chatMessage.getType().equals(ChatMessage.MessageType.CLOSE)) {
                log.info("*** CLOSE CODE *** ");
                chatMessage.setMessage(chatMessage.getMessage());
                sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
            }else if (chatMessage.getType().equals(ChatMessage.MessageType.JOIN)) {
                log.info("*** JOIN CODE *** ");
                chatMessage.setMessage(chatMessage.getMessage());
                sendToEachSocket(sessions,new TextMessage(objectMapper.writeValueAsString(chatMessage)) );
            }else {
                log.info("메세지 도착" + message);
                sendToEachSocket(sessions,message); //입장,퇴장 아닐 때는 클라이언트로부터 온 메세지 그대로 전달.
            }
        }catch (IllegalStateException e) {
            throw new SessionClosedException("session이 닫혔습니다.");
        }
    }
    private  void sendToEachSocket(Set<WebSocketSession> sessions, TextMessage message){
        sessions.parallelStream().forEach( roomSession -> {
            try {
                System.out.println(message);
                roomSession.sendMessage(message);
            } catch (IOException e) {
                throw new SessionClosedException("session이 닫혔습니다.");
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //javascript에서  session.close해서 연결 끊음. 그리고 이 메소드 실행.
        //session은 연결 끊긴 session을 매개변수로 이거갖고 뭐 하세요.... 하고 제공해주는 것 뿐
        log.info("connection closed");
    }


}
