package com.example.be.photo.entity;

import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
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
public class Photo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long photoId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id")
    private Fan fan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberfansign_id")
    private MemberFansign memberfansign;

    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private PayOrNot pay;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="artistfansign_id")
    private ArtistFansign artistFansign;

    // fanId 없는 생성자
    public Photo(Fan fan, MemberFansign memberFansign, String photoUrl, PayOrNot pay, ArtistFansign artistFansign) {
        this.fan = fan;
        this.memberfansign = memberFansign;
        this.photoUrl = photoUrl;
        this.pay = pay;
        this.artistFansign = artistFansign;
    }

    public Photo(Long photoId, Fan fan, MemberFansign memberfansign, String photoUrl, PayOrNot pay, ArtistFansign artistFansign) {
        this.photoId = photoId;
        this.fan = fan;
        this.memberfansign = memberfansign;
        this.photoUrl = photoUrl;
        this.pay = pay;
        this.artistFansign = artistFansign;
    }

    // pay(결제 정보) 변경 update
    public void payComplete(){
        this.pay = PayOrNot.Y;
    }

    // 연관관계 편의 메서드
    public void setMemberfansign(MemberFansign memberfansign){
        this.memberfansign = memberfansign;
        memberfansign.getPhotoList().add(this);
    }

    public void setFan(Fan fan){
        this.fan = fan;
        fan.getPhotoList().add(this);
    }

}