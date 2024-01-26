package com.example.be.session.commonSession;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class FansignRepository {
    Map<String, CommonSession> chatRoomMap = new HashMap<String, CommonSession>();
    public static Collection<CommonSession> chatRooms;

    public void ChatRoomRepository(String id) {
            CommonSession session = new CommonSession(id);
            chatRoomMap.put(session.getSessionId(), session);

        chatRooms = chatRoomMap.values();
    }

    public CommonSession getChatRoom(String id) {
        return chatRoomMap.get(id);
    }

    public Map<String, CommonSession> getChatRooms() {
        return chatRoomMap;
    }

    public void remove(WebSocketSession session) {
        this.chatRooms.parallelStream().forEach(chatRoom -> chatRoom.remove(session));
    }

}
