package com.example.be.session.commonSession;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChatMessage {
    // 메시지 타입 : 입장, 채팅, 나감
    public enum MessageType {
        ENTER, TALK, QUIT, CLOSE, JOIN
    }
    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private MessageDto message; // 메시지
}
