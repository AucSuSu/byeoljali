package com.example.be.applicant.dto;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SeparatedApplyPageDto {

    private Long memberfansignId;
    private String posterImageUrl; // 포스터 사진
    private String artistFansignTitle; // 팬싸인회 이름
    private String memberName; // 해당 멤버 이름
    private LocalDateTime startFansignTime; // 해당 팬싸 시작 시간 및 날짜
    private FansignStatus fansignStatus;
    private LocalDateTime startApplyTime; // 응모 시작시간
    private LocalDateTime endApplyTime; // 응모 끝나는 시간
    private FansignMode mode; // 추첨방식
    private Long artistFansignId;
    private Long artistId;

}
