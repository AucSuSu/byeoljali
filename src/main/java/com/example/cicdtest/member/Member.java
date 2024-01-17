package com.example.cicdtest.member;

import com.example.cicdtest.artist.Artist;
import com.example.cicdtest.common.BaseEntity;
import com.example.cicdtest.memberfansign.MemberFansign;
import jakarta.persistence.*;
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
    private String profileImage;

}
