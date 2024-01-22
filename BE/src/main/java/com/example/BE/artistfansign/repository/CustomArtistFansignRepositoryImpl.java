package com.example.BE.artistfansign.repository;

import com.example.BE.artistfansign.dto.FansignResponseDto;
import com.example.BE.artistfansign.entity.ArtistFansign;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

import static com.example.BE.applicant.QApplicant.applicant;
import static com.example.BE.artistfansign.entity.QArtistFansign.artistFansign;

@Component
public class CustomArtistFansignRepositoryImpl implements CustomArtistFansignRepository {

    @Autowired
    EntityManager em;
    JPAQueryFactory queryFactory;

    @Override
    public List<FansignResponseDto> findArtistFansignAndApplyInfo() {
        queryFactory = new JPAQueryFactory(em);
        List<FansignResponseDto> list
                =
                queryFactory.select(
                                Projections.constructor(
                                        FansignResponseDto.class,
                                        artistFansign.artistfansignId,
                                        artistFansign.posterImageUrl,
                                        applicant.applicantId,
                                        artistFansign.status
                                )
                        ).from(artistFansign)
                .rightJoin(applicant.artistFansign, artistFansign)
                .fetch();
        return list;
    }
}
