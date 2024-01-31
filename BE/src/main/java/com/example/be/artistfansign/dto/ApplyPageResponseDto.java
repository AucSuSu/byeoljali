package com.example.be.artistfansign.dto;


import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.member.entity.Member;

import java.util.List;

public class ApplyPageResponseDto {

    private String posterImageUrl;
    private String title;
    private List<Member> memberList;
    private FansignStatus status;
}
