package com.example.be.applicant.repository;

import com.example.be.applicant.dto.ApplyPageDetailDto;
import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.applicant.dto.SeparatedApplyPageDto;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.fan.entity.Fan;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import java.util.Date;
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
    public List<ApplyPageDto> findAllApplyPageById(Fan fan){

        Date currentDate = new java.util.Date();
        queryFactory = new JPAQueryFactory(em);

        ComparableExpressionBase<?> orderByExpression =
                Expressions.dateTimeTemplate(
                        java.sql.Timestamp.class,
                        "function('DATEDIFF', {0},{1})",
                        artistFansign.startFansignTime,
                        currentDate
                );

        return queryFactory.select(
                        Projections.constructor(
                                ApplyPageDto.class,
                                memberFansign.memberfansignId,
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
                .join(applicant)
                .on(applicant.memberfansign.eq(memberFansign))
                .leftJoin(winning)
                .on(winning.applicant.eq(applicant))
                .where(applicant.fan.eq(fan)) // 입력받은 fanId가 당첨자 fanId와 동일한 것만
                .orderBy(orderByExpression.desc())
                .fetch();
    }


    // 응모 중인 팬싸만 출력하는 페이지
    @Override
    public List<SeparatedApplyPageDto> findApplyingPageById(Fan fan){

        Date currentDate = new java.util.Date();
        queryFactory = new JPAQueryFactory(em);

        ComparableExpressionBase<?> orderByExpression =
                Expressions.dateTimeTemplate(
                        java.sql.Timestamp.class,
                        "function('DATEDIFF', {0},{1})",
                        artistFansign.startFansignTime,
                        currentDate
                );

        return queryFactory.select(
                        Projections.constructor(
                                SeparatedApplyPageDto.class,
                                memberFansign.memberfansignId,
                                artistFansign.posterImageUrl,
                                artistFansign.title,
                                member.name,
                                artistFansign.startFansignTime,
                                artistFansign.status
                        )
                ).from(memberFansign)
                .join(artistFansign)
                .on(artistFansign.eq(memberFansign.artistFansign)) // 아티스트팬싸인이 겹치고
                .join(member)
                .on(memberFansign.member.eq(member)) // 해당 멤버가 같은 멤버 팬싸인에서
                .join(applicant)
                .on(applicant.memberfansign.eq(memberFansign))
                .where(applicant.fan.eq(fan),
                        artistFansign.status.eq(FansignStatus.APPLYING)) // 입력받은 fanId가 당첨자 fanId와 동일한 것만
                .orderBy(orderByExpression.desc())
                .fetch();
    }

    // 당첨된 팬싸만 보여주는 페이지
    @Override
    public List<SeparatedApplyPageDto> findWonPageById(Fan fan){

        Date currentDate = new java.util.Date();
        queryFactory = new JPAQueryFactory(em);

        ComparableExpressionBase<?> orderByExpression =
                Expressions.dateTimeTemplate(
                        java.sql.Timestamp.class,
                        "function('DATEDIFF', {0},{1})",
                        artistFansign.startFansignTime,
                        currentDate
                );


        return queryFactory.select(
                        Projections.constructor(
                                SeparatedApplyPageDto.class,
                                memberFansign.memberfansignId,
                                artistFansign.posterImageUrl,
                                artistFansign.title,
                                member.name,
                                artistFansign.startFansignTime,
                                artistFansign.status
                        )
                ).from(memberFansign)
                .join(artistFansign)
                .on(artistFansign.eq(memberFansign.artistFansign)) // 아티스트팬싸인이 겹치고
                .join(member)
                .on(memberFansign.member.eq(member)) // 해당 멤버가 같은 멤버 팬싸인에서
                .join(winning)
                .on(winning.memberfansign.eq(memberFansign))
                .where(winning.fan.eq(fan),
                        artistFansign.status.eq(FansignStatus.READY_FANSIGN)
                                .or(artistFansign.status.eq(FansignStatus.FANSIGN))
                                .or(artistFansign.status.eq(FansignStatus.SESSION_CONNECTED)))
                .orderBy(orderByExpression.desc())
                .fetch();
    }

    @Override
    public ApplyPageDetailDto findDetailFSBymemberFSId(Long memberFansignId, Fan fan){
        queryFactory = new JPAQueryFactory(em);

        return queryFactory.select(
                        Projections.constructor(
                                ApplyPageDetailDto.class,
                                memberFansign.memberfansignId,
                                artistFansign.posterImageUrl,
                                artistFansign.title,
                                member.name,
                                artistFansign.information,
                                new CaseBuilder() // 당첨 여부에 따라서 갈려야 함
                                        .when(winning.winningId.isNull()).then(false) // 응모까지만
                                        .otherwise(true), // 당첨된 사람
                                artistFansign.status,
                                artistFansign.startApplyTime,
                                artistFansign.endApplyTime,
                                artistFansign.startFansignTime,
                                new CaseBuilder() // 당첨 여부에 따라서 갈려야 함
                                        .when(winning.winningId.isNull()).then(-1) // 미당첨 시, -1 값을 가지도록
                                        .otherwise(winning.orders) // 당첨된 사람
                        )
                ).from(memberFansign)
                .join(artistFansign)
                .on(artistFansign.eq(memberFansign.artistFansign)) // 아티스트팬싸인이 겹치고
                .join(member)
                .on(memberFansign.member.eq(member)) // 해당 멤버가 같은 멤버 팬싸인에서
                .join(applicant)
                .on(applicant.memberfansign.eq(memberFansign))
                .leftJoin(winning)
                .on(winning.applicant.eq(applicant))
                .where(applicant.fan.eq(fan),
                        memberFansign.memberfansignId.eq(memberFansignId)) // 입력받은 fanId가 당첨자 fanId와 동일한 것만
                .fetchOne();

    }




}
