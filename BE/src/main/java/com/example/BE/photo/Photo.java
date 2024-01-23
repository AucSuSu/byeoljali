package com.example.be.photo;

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

    private boolean pay; // 결제 여부

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="artistfansign_id")
    private ArtistFansign artistFansign;
}
