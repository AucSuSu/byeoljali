package com.example.be.session.commonSession;

import lombok.Data;

import java.util.List;

@Data
public class MessageDto {
    String birthday; // TALK 팬 생일
    int fanId;
    String nickname;
    int orders; // JOIN, CLOSE 호출
    List<String> postit; // TALK 포스트잇
}


