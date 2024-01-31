package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.winning.dto.WinningDto;
import com.example.be.winning.dto.WinningInsertDto;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import static com.example.be.applicant.entity.QApplicant.applicant;
import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.fan.entity.QFan.fan;
import static com.example.be.member.entity.QMember.member;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;

@Repository
@RequiredArgsConstructor
@Transactional
@Slf4j
public class SchedulingRepositoryImpl implements SchedulingRepositoryCustom {

    private final EntityManager em;
    private final JdbcTemplate jdbcTemplate;
    private final JPAQueryFactory jpaQueryFactory;


    // 이후 config 파일로 빼기
    private final int BATCH_SIZE = 10;

    private int batchInsert(int batchSize, int batchCount, List<WinningInsertDto> subItems){
        jdbcTemplate.batchUpdate("INSERT INTO winning (orders, applicant_id, fan_id, memberfansign_id) values (?,?,?,?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, subItems.get(i).getOrders());
                        ps.setLong(2, subItems.get(i).getApplicantId());
                        ps.setLong(3, subItems.get(i).getFanId());
                        ps.setLong(4, subItems.get(i).getMemberfansignId());
                    }

                    @Override
                    public int getBatchSize() {
                        return subItems.size();
                    }
                });
        subItems.clear();
        batchCount++;
        return batchCount;
    }


    @Override
    public void updateStatusToEndApply(String date) {

        log.info(" *** repository : 응모마감으로 status 변경 *** ");

        jpaQueryFactory
                .update(artistFansign)
                .set(artistFansign.status, FansignStatus.READY_FANSIGN)
                .where(Expressions.
                                dateTemplate(String.class, "DATE_FORMAT({0}, {1})",
                                        artistFansign.endApplyTime,
                                        "%Y-%m-%d").eq(date),
                        artistFansign.status.eq(FansignStatus.APPLYING)).execute();
        em.flush();
        em.clear();
    }

    @Override
    public void updateStatusToApplying(String date) {

        log.info(" *** repository : applying 가능하도록 status 변경 *** ");

        jpaQueryFactory
                .update(artistFansign)
                .set(artistFansign.status, FansignStatus.APPLYING)
                .where(Expressions.
                                dateTemplate(String.class, "DATE_FORMAT({0}, {1})",
                                        artistFansign.startApplyTime,
                                        "%Y-%m-%d").eq(date),
                        artistFansign.status.eq(FansignStatus.READY_APPLYING))
                .execute();
        em.flush();
        em.clear();
    }

    @Override
    public void updateStatusToFansign(String date) {
        log.info(" *** repository : fansign 진행중 status 변경 *** ");

        jpaQueryFactory
                .update(artistFansign)
                .set(artistFansign.status, FansignStatus.FANSIGN)
                .where(Expressions.
                                dateTemplate(String.class, "DATE_FORMAT({0}, {1})",
                                        artistFansign.startFansignTime,
                                        "%Y-%m-%d HH").eq(date),
                        artistFansign.status.eq(FansignStatus.SESSION_CONNECTED))
                .execute();
        em.flush();
        em.clear();
    }

    @Override
    public void updateStatusToSessionConnected(Long artistFansignId) {

        log.info(" *** repository : session 발급한 팬싸인회 status 변경 *** " + artistFansignId);

        jpaQueryFactory
                .update(artistFansign)
                .set(artistFansign.status, FansignStatus.SESSION_CONNECTED)
                .where(artistFansign.artistfansignId.eq(artistFansignId))
                .execute();

        em.flush();
        em.clear();
    }

    @Override
    public int insertWinner(List<WinningInsertDto> list) {
        log.info(" *** repository : 당첨자 insert *** ");
       return batchInsert(BATCH_SIZE, 0, list);
    }

    @Override
    public List<WinningDto> getWinningInsertDto(Long memberFansignId, FansignMode orderCondition) {

        OrderSpecifier orderByExpression;

        // 파라미터 값에 따라 정렬 기준을 선택
        if (orderCondition.equals(FansignMode.DESC)) {
            orderByExpression = applicant.boughtAlbum.desc();

        } else {
            orderByExpression = makeRandom();
        }


        return jpaQueryFactory
                .select(Projections.constructor(
                        WinningDto.class,
                        artistFansign.title,
                        fan.email,
                        memberFansign.memberfansignId,
                        artistFansign.startFansignTime,
                        member.name,
                        fan.fanId,
                        applicant.applicantId
                ))
                .from(applicant)
                .join(applicant.memberfansign, memberFansign)
                .join(memberFansign.artistFansign, artistFansign)
                .join(applicant.fan, fan)
                .join(memberFansign.member, member)
                .where(memberFansign.memberfansignId.eq(memberFansignId))
                .orderBy(orderByExpression)
                .limit(100)
                .fetch();

    }

    public static OrderSpecifier<Double> makeRandom() { // Mysql RAND 함수를 지원하지 않아서 만든 함수
        return Expressions.numberTemplate(Double.class, "function('rand')").asc();
    }

}
