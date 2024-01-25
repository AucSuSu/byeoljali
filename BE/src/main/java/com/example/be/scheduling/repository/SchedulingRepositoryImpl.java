package com.example.be.scheduling.repository;

import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.winning.dto.WinningInsertDto;
import com.example.be.winning.entity.Winning;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Query;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import static com.example.be.applicant.entity.QApplicant.applicant;
import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;
import static com.example.be.winning.entity.QWinning.winning;

@Repository
@RequiredArgsConstructor
@Slf4j
public class SchedulingRepositoryImpl implements SchedulingRepositoryCustom {

    private final JdbcTemplate jdbcTemplate;
    private final JPAQueryFactory jpaQueryFactory;


    // 이후 config 파일로 빼기
    private final int BATCH_SIZE = 10;

    private int batchInsert(int batchSize, int batchCount, List<WinningInsertDto> subItems){
        jdbcTemplate.batchUpdate("INSERT INTO winning () values (?,?)",
                new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        // ps.setString(1, subItems.get().getWinningId());
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
                        artistFansign.status.eq(FansignStatus.READY_APPLYING)).execute();
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
                        artistFansign.status.eq(FansignStatus.SESSION_CONNECTED)).execute();

    }

    @Override
    public int insertWinner(List<WinningInsertDto> list) {
        log.info(" *** repository : 당첨자 insert *** ");
       return batchInsert(BATCH_SIZE, 0, list);
    }

}
