package com.example.be.session.commonSession;


import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.fan.dto.FanMyPageResponseDto;
import com.example.be.fan.dto.FanMyPageUpdateRequestDto;
import com.example.be.fan.service.FanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SessionTestController {

    private final ChatService chatService;

    @RequestMapping("/chat/chatList")
    public List<ChatRoom> chatList(){
        List<ChatRoom> roomList = chatService.findAllRoom();
        return roomList;
    }


    @PostMapping("/chat/createRoom/{name}")  //방을 만들었으면 해당 방으로 가야지.
    public ChatRoom createRoom(@PathVariable String name, String username) {
        ChatRoom room = chatService.createRoom(name);
        return room;  //만든사람이 채팅방 1빠로 들어가게 됩니다
    }


}