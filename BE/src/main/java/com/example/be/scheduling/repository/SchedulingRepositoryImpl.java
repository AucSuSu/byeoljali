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
    public List<ArtistFansign> findByendApplyTime(LocalDateTime date) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        // 당첨자를 뽑아야하는 artistFansign 가져오기 -> 상태 바꾸기
        // 당첨자를 뽑아야하는 memberFansign의 응모자에서 random으로 100명 뽑기
        // 뽑은 list를 bulk insert 해주기

        List<ArtistFansign> list =
        jpaQueryFactory.selectFrom(artistFansign)
                .where(Expressions.
                        dateTemplate(String.class, "DATE_FORMAT({0}, {1})", artistFansign.endApplyTime,
                                "%Y-%m-%d").eq(formattedDate),
                        artistFansign.status.eq(FansignStatus.APPLYING)).fetch();
        return list;
    }

    @Override
    public void updateStatusToEndApply(LocalDateTime date) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        jpaQueryFactory
                .update(artistFansign).set(artistFansign.status, FansignStatus.READY_FANSIGN)
                .where(Expressions.
                                dateTemplate(String.class, "DATE_FORMAT({0}, {1})", artistFansign.endApplyTime,
                                        "%Y-%m-%d").eq(formattedDate),
                        artistFansign.status.eq(FansignStatus.APPLYING)).execute();

    }


    public void getWinningList(LocalDateTime date){

        // 한번에 당첨을 모두 시켜버리기 (모든 멤버 팬싸인)의 문제점
        // 순서를 정하는데 row-num을 못 씀
        // groupby
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        jpaQueryFactory
                .update(artistFansign)
                .set(artistFansign.status, FansignStatus.READY_FANSIGN)
                .where(Expressions.
                                dateTemplate(String.class, "DATE_FORMAT({0}, {1})",
                                        artistFansign.endApplyTime,
                                        "%Y-%m-%d").eq(formattedDate),
                        artistFansign.status.eq(FansignStatus.APPLYING)).execute();


    }
}
