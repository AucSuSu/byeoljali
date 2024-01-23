package com.example.be.artistfansign.repository;

import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.entity.FansignStatus;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PrePersist;
import java.util.List;

import static com.example.be.applicant.entity.QApplicant.applicant;
import static com.example.be.artist.entity.QArtist.artist;
import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.fan.entity.QFan.fan;
import static com.example.be.member.QMember.member;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;


@Component
public class CustomArtistFansignRepositoryImpl implements CustomArtistFansignRepository {

    @Autowired
    EntityManager em;
    JPAQueryFactory queryFactory = new JPAQueryFactory(em);

    @PrePersist
    public void init() {
        queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId) {

        // queryFactory = new JPAQueryFactory(em);
//        List<FansignResponseDto> list1
//                =
                return queryFactory.select(
                                Projections.constructor(
                                        FansignResponseDto.class,
                                        artistFansign.artistfansignId,
                                        artistFansign.title,
                                        artistFansign.posterImageUrl,
                                        new CaseBuilder()
                                                .when(applicant.applicantId.isNull()).then(false)
                                                .otherwise(true),
                                        artistFansign.status
                                )
                        ).from(artistFansign)
                        .leftJoin(applicant)
                        .on(artistFansign.eq(applicant.artistFansign))
                        .on(applicant.fan.eq(
                                JPAExpressions.select(fan)
                                        .from(fan)
                                        .where(fan.fanId.eq(fanId))
                        ))
                        .fetch();

    }

    @Override
    public List<ArtistsMyFansignResponseDto> findArtistsMyFansign(Long artistId, FansignStatus status) {
        queryFactory = new JPAQueryFactory(em);
        return queryFactory.select(
                        Projections.constructor(
                                ArtistsMyFansignResponseDto.class,
                                artistFansign.artistfansignId,
                                memberFansign.memberfansignId,
                                artistFansign.title,
                                member.name,
                                artistFansign.posterImageUrl,
                                artistFansign.status

                        )
                ).from(artistFansign)
                .join(memberFansign)
                .on(artistFansign.eq(memberFansign.artistFansign))
                .on(artistFansign.artist.eq(
                        JPAExpressions.select(artist)
                                .from(artist)
                                .where(artist.artistId.eq(artistId))
                )).join(member)
                .on(member.eq(memberFansign.member))
                .where(artistFansign.status.eq(status))
                .fetch();
    }
}
