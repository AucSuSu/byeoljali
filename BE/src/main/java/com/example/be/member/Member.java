package com.example.be.member;


import com.example.be.artist.entity.Artist;
import com.example.be.common.BaseEntity;
import com.example.be.memberfansign.entity.MemberFansign;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;

    @OneToMany(mappedBy = "member")
    private List<MemberFansign> memberFansignList = new ArrayList<>();

    private String name;
    private String profileImageUrl;

    public Member(Artist artist, String name, String profileImageUrl) {
        this.artist = artist;
        this.name = name;
        this.profileImageUrl = profileImageUrl;
    }
}
