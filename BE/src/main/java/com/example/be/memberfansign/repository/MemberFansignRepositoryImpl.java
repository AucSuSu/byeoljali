package com.example.be.memberfansign.repository;


import com.example.be.memberfansign.dto.MemberFansignResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.member.entity.QMember.member;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;

@Component
@RequiredArgsConstructor
@Slf4j
public class MemberFansignRepositoryImpl implements MemberFansignRepositoryCustom {
    @Autowired
    JPAQueryFactory queryFactory;
    @Override
    public MemberFansignResponseDto getMemberfansignDetail(Long memberfansignId) {


        return queryFactory.select( Projections.constructor(
                MemberFansignResponseDto.class,
                artistFansign.artistfansignId,
                memberFansign.memberfansignId,
                artistFansign.information,
                artistFansign.title,
                member.name,
                member.artist.artistId,
                artistFansign.posterImageUrl,
                artistFansign.status,
                artistFansign.startApplyTime,
                artistFansign.endApplyTime,
                artistFansign.startFansignTime
        ))
                .from(memberFansign)
                .join(memberFansign.artistFansign, artistFansign)
                .join(member)
                .on(member.eq(memberFansign.member))
                .where(memberFansign.memberfansignId.eq(memberfansignId))
                .fetchOne();
    }
}
