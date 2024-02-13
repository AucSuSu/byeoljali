package com.example.be.artistfansign.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignGroupByStatusCountDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.fan.entity.Fan;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
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
import static com.example.be.member.entity.QMember.member;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;


@Component
@RequiredArgsConstructor
@Slf4j
public class ArtistFansignRepositoryImpl implements CustomArtistFansignRepository {

    @Autowired
    EntityManager em;

    JPAQueryFactory queryFactory;


    @Override
    public List<RecentFansignResponseDto> findTop6ByOrderByCreatedDateDesc() {
        queryFactory = new JPAQueryFactory(em);
        Date currentDate = new java.util.Date();

        return queryFactory.select(
                        Projections.constructor(
                            RecentFansignResponseDto.class,
                                artistFansign.posterImageUrl
                        )
                )
                .from(artistFansign)
                .where(artistFansign.posterImageUrl.isNotNull(), artistFansign.createdDate.isNotNull())
                .orderBy(Expressions.dateTimeTemplate(
                        java.sql.Timestamp.class,
                        "function('timestampdiff', second, {0}, {1})",
                        artistFansign.createdDate,
                        currentDate).asc())
                .limit(6)
                .fetch();
    }

    // 팬 메인페이지에서 팬싸인회 전부 가져오기 (키워드, 정렬순)
    @Override
    public List<FansignResponseDto> findArtistFansignAndApplyInfo(Fan fan, String keyword, String orderCondition, FansignStatus status) {

        // 정렬 필터링
        Date currentDate = new java.util.Date();
        queryFactory = new JPAQueryFactory(em);
        ComparableExpressionBase<?> orderByExpression =
                Expressions.dateTimeTemplate(
                java.sql.Timestamp.class,
                "function('DATEDIFF', {0}, {1})",
                artistFansign.endApplyTime,
                currentDate);

        // 파라미터 값에 따라 정렬 기준을 선택
        if ("approaching".equals(orderCondition)) {
            orderByExpression = Expressions.dateTimeTemplate(
                    java.sql.Timestamp.class,
                    "function('timestampdiff', second, {0}, {1})",
                    currentDate,
                    artistFansign.endApplyTime
                    );
        } else if ("register".equals(orderCondition)) {
            orderByExpression = Expressions.dateTimeTemplate(
                    java.sql.Timestamp.class,
                    "function('timestampdiff', second, {0}, {1})",
                    artistFansign.createdDate,currentDate);
        }

        log.info(orderCondition);

        return queryFactory.select(
                                Projections.constructor(
                                        FansignResponseDto.class,
                                        artistFansign.artistfansignId,
                                        artistFansign.title,
                                        artistFansign.posterImageUrl,
                                        new CaseBuilder()
                                                .when(applicant.applicantId.isNull()).then(false)
                                                .otherwise(true),
                                        artistFansign.status,
                                        artist.artistId,
                                        artist.name,
                                        artistFansign.startApplyTime,
                                        artistFansign.endApplyTime,
                                        artistFansign.startFansignTime
                                )
                        ).from(applicant)
                        .rightJoin(applicant.artistFansign, artistFansign)
                        .on(applicant.fan.eq(fan)).join(artistFansign.artist, artist)
                        .where(searchKeyword(keyword), artistFansign.status.eq(status))
                        .orderBy(orderByExpression.asc())
                        .fetch();
    }

    private BooleanExpression searchKeyword(String searchKeyword) {
        return StringUtils.isEmpty(searchKeyword) ? null : artist.name.contains(searchKeyword);
    }

    // 아티스트 마이페이지에서 내가 개설한 팬싸인회 정보 모두 가져오기
    // STATUS의 default는 front에서 지정해서 보내줘야함
    @Override
    public List<ArtistsMyFansignResponseDto> findArtistsMyFansign(Artist artist, FansignStatus status) {

        queryFactory = new JPAQueryFactory(em);

        // 현재날짜 (현재날짜와 가장 가까운 순으로 정렬해야하므로)

        Date currentDate = new java.util.Date();

        return queryFactory.select(
                        Projections.constructor(
                                ArtistsMyFansignResponseDto.class,
                                artistFansign.artistfansignId,
                                memberFansign.memberfansignId,
                                artistFansign.title,
                                member.name,
                                artistFansign.artist.artistId,
                                artistFansign.posterImageUrl,
                                artistFansign.status,
                                artistFansign.startApplyTime,
                                artistFansign.endApplyTime,
                                artistFansign.startFansignTime
                        )
                ).from(artistFansign)
                .join(memberFansign)
                .on(artistFansign.eq(memberFansign.artistFansign))
                .on(artistFansign.artist.eq(artist)
                ).join(member)
                .on(member.eq(memberFansign.member))
                .where(statusCheck(status))
                .orderBy(Expressions.dateTimeTemplate(
                        java.sql.Timestamp.class,
                        "function('timestampdiff', second, {0}, {1})",
                        artistFansign.startFansignTime,
                        currentDate).asc())
                .fetch();
    }

    private BooleanExpression statusCheck(FansignStatus status) {
        return status==FansignStatus.SESSION_CONNECTED || status==FansignStatus.FANSIGN ?
                (artistFansign.status.eq(FansignStatus.FANSIGN).or(artistFansign.status.eq(FansignStatus.SESSION_CONNECTED))) : artistFansign.status.eq(status);
    }

    @Override
    public List<FansignGroupByStatusCountDto> getCountGroupByStatus(Artist artist) {

        queryFactory = new JPAQueryFactory(em);

        return queryFactory.select(
                Projections.constructor(
                        FansignGroupByStatusCountDto.class,
                        memberFansign.count(),
                        artistFansign.status
                )).from(memberFansign)
                .join(memberFansign.artistFansign, artistFansign)
                .where(artistFansign.artist.eq(artist))
                .groupBy(artistFansign.status)
                .fetch();

    }
}
