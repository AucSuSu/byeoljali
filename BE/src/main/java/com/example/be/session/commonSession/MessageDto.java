package com.example.be.session.commonSession;

import lombok.Data;

@Data
public class MessageDto {

    int orders; // JOIN, CLOSE 호출
    String postit; // TALK 포스트잇
    String birthday; // TALK 팬 생일
    String nickname;
}
