package com.example.be.artistfansign.entity;

import com.example.be.artist.entity.Artist;
import com.example.be.common.BaseEntity;
import com.example.be.memberfansign.entity.MemberFansign;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArtistFansign extends BaseEntity { // 아티스트 기준 팬싸인회

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
    @JsonBackReference
    private List<MemberFansign> memberFansignList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    public ArtistFansign(String title, String posterImageUrl, String information, LocalDateTime startApplyTime, LocalDateTime endApplyTime, LocalDateTime startFansignTime, FansignStatus status, FansignMode mode, Artist artist) {
        this.title = title;
        this.posterImageUrl = posterImageUrl;
        this.information = information;
        this.startApplyTime = startApplyTime;
        this.endApplyTime = endApplyTime;
        this.startFansignTime = startFansignTime;
        this.status = status;
        this.mode = mode;
        this.artist = artist;
    }

    // status 변경 update
    public void updateStatus(FansignStatus status){
        this.status = status;
    }
}

