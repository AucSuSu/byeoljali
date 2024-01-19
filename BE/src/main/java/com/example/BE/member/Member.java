package com.example.BE.member;

import com.example.BE.artist.Artist;
import com.example.BE.common.BaseEntity;
import com.example.BE.memberfansign.MemberFansign;
import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity  {

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

}
