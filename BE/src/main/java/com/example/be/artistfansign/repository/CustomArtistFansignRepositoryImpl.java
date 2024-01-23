package com.example.be.artistfansign.repository;

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


@Component
public class CustomArtistFansignRepositoryImpl implements CustomArtistFansignRepository {

    @Autowired
    EntityManager em;
    JPAQueryFactory queryFactory;

    @Override
    public List<FansignResponseDto> findArtistFansignAndApplyInfo(Long fanId) {
        // aritstFansign 은 전부 조회되어야함
        //
        queryFactory = new JPAQueryFactory(em);
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
//        return list1;
    }
}
