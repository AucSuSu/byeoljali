package com.example.BE.fansign;

import com.example.BE.common.BaseEntity;
import com.example.BE.memberfansign.MemberFansign;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Fansign extends BaseEntity  { // 아티스트 기준 팬싸인회

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sign_id")
    private Long fansignId;

    private String title;
    private String posterImage;
    private String information;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;

    @Enumerated(EnumType.STRING)
    private FansignStatus status;

    @Enumerated(EnumType.STRING)
    private FansignMode mode;

    @OneToMany(mappedBy = "fansign")
    private List<MemberFansign> memberFansignList = new ArrayList<>();
}

enum FansignMode {
    // 랜덤방식, 내림차순 방식
    RANDOM, DESC
}

enum FansignStatus {
    // 응모대기, 응모중, 응모완료(=팬싸인회 대기), 팬싸인회중, 팬싸인회끝
    READY_APPLYING, APPLYING, READY_FANSIGN, FANSIGN, FINISH
}


