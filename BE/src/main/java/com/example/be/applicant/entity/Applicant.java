package com.example.be.applicant.entity;



import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.common.BaseEntity;
import com.example.be.fan.entity.Fan;
import com.example.be.memberfansign.entity.MemberFansign;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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

    public Applicant(Fan fan, MemberFansign memberfansign, int boughtAlbum, ArtistFansign artistFansign) {
        this.fan = fan;
        this.memberfansign = memberfansign;
        this.boughtAlbum = boughtAlbum;
        this.artistFansign = artistFansign;
    }

    // 연관관계 편의 메서드
    public void setMemberFansign(MemberFansign memberfansign){
        this.memberfansign = memberfansign;
        memberfansign.getApplicantList().add(this);
    }

    public void setFan(Fan fan){
        this.fan = fan;
        fan.getApplicantList().add(this);
    }

}
