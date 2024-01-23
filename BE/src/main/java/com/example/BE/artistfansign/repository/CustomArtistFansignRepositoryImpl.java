package com.example.BE.artistfansign.repository;

import com.example.BE.artistfansign.dto.FansignResponseDto;
import com.example.BE.artistfansign.entity.ArtistFansign;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

import static com.example.BE.applicant.entity.QApplicant.applicant;
import static com.example.BE.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.BE.fan.entity.QFan.fan;

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
        List<FansignResponseDto> list
                =
                queryFactory.select(
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
        return list;
    }
}
