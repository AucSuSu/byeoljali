package com.example.be.session.commonSession;

import lombok.Data;

import java.util.List;

@Data
public class MessageDto {

    int fanId;
    int orders; // JOIN, CLOSE 호출
    List<String>  postit; // TALK 포스트잇
    String birthday; // TALK 팬 생일
    String nickname;
}


