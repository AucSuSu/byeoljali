package com.example.BE.artistfansign.entity;

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
public class ArtistFansign extends BaseEntity  { // 아티스트 기준 팬싸인회

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artistfansign_id")
    private Long artistfansignId;

    private String title;
    private String posterImageUrl;
    private String information;
    private LocalDateTime startApplyTime;
    private LocalDateTime endApplyTime;
    private LocalDateTime startFansignTime;

    @Enumerated(EnumType.STRING)
    private FansignStatus status;

    @Enumerated(EnumType.STRING)
    private FansignMode mode;

    @OneToMany(mappedBy = "artistFansign")
    private List<MemberFansign> memberFansignList = new ArrayList<>();

    public ArtistFansign(String title, String posterImageUrl, String information, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime, FansignStatus status, FansignMode mode) {
        this.title = title;
        this.posterImageUrl = posterImageUrl;
        this.information = information;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
        this.status = status;
        this.mode = mode;
    }
}

