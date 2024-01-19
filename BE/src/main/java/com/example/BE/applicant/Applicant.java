package com.example.BE.applicant;


import com.example.BE.common.BaseEntity;
import com.example.BE.fan.Fan;
import com.example.BE.artistfansign.ArtistFansign;
import com.example.BE.memberfansign.MemberFansign;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Applicant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "applicant_id")
    private Long applicantId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;

    private int boughtAlbum; // 구매 앨범 개수

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistfansign_id")
    private ArtistFansign artistFansign;

}
