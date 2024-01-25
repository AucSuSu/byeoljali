package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.memberfansign.dto.MemberFansignInfoDto;
import com.example.be.memberfansign.entity.MemberFansign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.example.be.winning.dto.WinningInsertDto;

import java.time.LocalDateTime;
import java.util.List;

public interface SchedulingRepository extends JpaRepository<ArtistFansign, Long>, SchedulingRepositoryCustom {

    // 현재 응모중이면서, endApplyTime이 오늘인 팬싸인회 체크
    // 팬싸인회 정보 가져오기
    @Query("select new com.example.be.memberfansign.dto.MemberFansignInfoDto(mf.memberfansignId, afs.artistfansignId, afs.mode) " +
            "from MemberFansign mf " +
            "join mf.artistFansign afs " +
            "where FUNC('DATE_FORMAT', afs.endApplyTime, '%Y-%m-%d') = FUNC( :current_date ) " +
            "and afs.status = 'APPLYING' ")
    List<MemberFansignInfoDto> getMemberFansignList(@Param("current_date") String current_date);

    // 당첨자 뽑기
    @Query(value = "select new com.example.be.winning.dto.WinningInsertDto(mf.memberfansignId, a.fanId, a.applicantId,ROW_NUMBER()) " +
            "from applicant a " +
            "join a.mf mf " +
            "where mf.memberfansignId = :memberFansignId " +
            "order by " +
            "case " +
            "when :ordercon = 'RANDOM' then RAND() " +
            "when :ordercon = 'DESC' then a.boughtAlbum.desc " +
            "limit 100 ", nativeQuery = true)
    List<WinningInsertDto> getWinningInsertDto(@Param("memberFansignId") Long memberFansignId, @Param("ordercon") FansignMode orderCondition);

}
