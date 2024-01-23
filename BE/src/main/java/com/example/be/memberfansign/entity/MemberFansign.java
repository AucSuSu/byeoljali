package com.example.be.memberfansign.entity;

import com.example.be.applicant.entity.Applicant;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.common.BaseEntity;
import com.example.be.member.Member;
import com.example.be.photo.entity.Photo;
import com.example.be.winning.entity.Winning;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberFansign extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberfansign_id")
    private Long memberfansignId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artistfansign_id")
    private ArtistFansign artistFansign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 안쓸 거 같긴함 - 팬싸인회를 통해서 앨범을 보는 거니까
    @OneToMany(mappedBy = "memberfansign")
    private List<Photo> photoList = new ArrayList<>();

    @OneToMany(mappedBy = "memberfansign")
    private List<Applicant> applicantList = new ArrayList<>();

    @OneToMany(mappedBy = "memberfansign")
    private List<Winning> winningList = new ArrayList<>();

    public MemberFansign(ArtistFansign artistFansign, Member member) {
        this.artistFansign = artistFansign;
        this.member = member;
    }
}
