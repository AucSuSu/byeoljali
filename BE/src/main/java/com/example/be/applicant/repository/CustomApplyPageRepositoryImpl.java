package com.example.be.applicant.repository;

import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.List;

import static com.example.be.applicant.entity.QApplicant.applicant;
import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.fan.entity.QFan.fan;

// 여기 물어보기
import static com.example.be.member.QMember.member;
import static com.example.be.winning.entity.QWinning.winning;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;


@Component
public class CustomApplyPageRepositoryImpl implements CustomApplyPageRepository{

    @Autowired
    EntityManager em;
    JPAQueryFactory queryFactory;

    @Override
    public List<ApplyPageDto> findAllApplyPageById(Long fanId){
        queryFactory = new JPAQueryFactory(em);

        return queryFactory.select(
                        Projections.constructor(
                                ApplyPageDto.class,
                                artistFansign.posterImageUrl,
                                artistFansign.title,
                                member.name,
                                artistFansign.startFansignTime,
                                new CaseBuilder() // 당첨 여부에 따라서 갈려야 함
                                        .when(winning.winningId.isNull()).then(false) // 응모까지만
                                        .otherwise(true), // 당첨 목록으로 넘어감
                                artistFansign.status
                        )
                ).from(memberFansign)
                .join(artistFansign)
                .on(artistFansign.eq(memberFansign.artistFansign)) // 아티스트팬싸인이 겹치고
                .join(member)
                .on(memberFansign.member.eq(member)) // 해당 멤버가 같은 멤버 팬싸인에서
                .join(winning)
                .on(winning.memberfansign.eq(memberFansign))
                .where(winning.fan.eq(JPAExpressions.select(fan)
                        .from(fan)
                        .where(fan.fanId.eq(fanId)))) // 입력받은 fanId가 당첨자 fanId와 동일한 것만
                .fetch();
    }
}
