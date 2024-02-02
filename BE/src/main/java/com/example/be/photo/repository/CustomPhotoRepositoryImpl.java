package com.example.be.photo.repository;

import com.example.be.fan.entity.Fan;
import com.example.be.photo.dto.PhotoResponseDto;
import com.example.be.photo.entity.PayOrNot;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

import static com.example.be.applicant.entity.QApplicant.applicant;
import static com.example.be.artist.entity.QArtist.artist;
import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.fan.entity.QFan.fan;
import static com.example.be.photo.entity.QPhoto.photo;

@Component
@Slf4j
public class CustomPhotoRepositoryImpl implements CustomPhotoRepository {

    @Autowired
    EntityManager em;

    JPAQueryFactory queryFactory;

    // 인생네컷 페이지에서 모든 인생네컷 가져오기 / 필터된 값만 가져오기
    @Override
    public List<PhotoResponseDto> findAllandFilteredPhoto(Fan fan, String keyword, PayOrNot payOrNot){
        queryFactory = new JPAQueryFactory(em);

        return queryFactory.select(
                        Projections.constructor(
                                PhotoResponseDto.class,
                                photo.photoId,
                                artistFansign.startFansignTime,
                                photo.photoUrl,
                                photo.pay,
                                artistFansign.title
                        )
                ).from(photo)
                .join(artistFansign)
                .on(artistFansign.eq(photo.artistFansign))
                .join(artist)
                .on(artistFansign.artist.eq(artist))
                .where(searchKeyword(keyword), checkPayOrNot(payOrNot), photo.fan.eq(fan)) // 검색기능 - 아티스트 이름만
                .orderBy(artistFansign.startFansignTime.asc()) // 최근 순서대로
                .fetch();
    }

    private BooleanExpression searchKeyword(String searchKeyword) {
        return StringUtils.isEmpty(searchKeyword) ? null : artist.name.contains(searchKeyword);
    }

    private BooleanExpression checkPayOrNot(PayOrNot payOrNot) {
        return (payOrNot==null) ? null : photo.pay.eq(payOrNot);
    }

}
