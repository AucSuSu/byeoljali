package com.example.BE.artistfansign.dto;

import com.example.BE.artistfansign.entity.FansignStatus;
import com.example.BE.member.Member;

import java.util.List;

public class ApplyPageResponseDto {

    private String posterImageUrl;
    private String title;
    private List<Member> memberList;
    private FansignStatus status;
}
