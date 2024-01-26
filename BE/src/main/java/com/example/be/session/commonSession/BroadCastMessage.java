package com.example.be.session.commonSession;

public class BroadCastMessage {
    String chatRoomId;
    String message; // 이후에 code로 변경하기
    String type;

    public String getChatRoomId() {
        return chatRoomId;
    }
    public String getMessage() {
        return message;
    }
    public String getType() {
        return type;
    }
}
