package com.example.BE.artistfansign.dto;

import com.example.BE.artistfansign.entity.FansignMode;
import com.example.BE.member.Member;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class AddArtistFansignRequestDto {
    private String title;
    private String information;
    private LocalDateTime  startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;
    private FansignMode mode;
    private String postImageUrl;
    private List<Long> memberIdList;
}
