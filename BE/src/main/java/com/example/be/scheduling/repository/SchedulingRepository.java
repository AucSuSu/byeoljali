package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.memberfansign.dto.MemberFansignInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SchedulingRepository extends JpaRepository<ArtistFansign, Long>, SchedulingRepositoryCustom {

    // 현재 응모중이면서, endApplyTime이 오늘인 팬싸인회 체크
    // 팬싸인회 정보 가져오기
    @Query("select new com.example.be.memberfansign.dto.MemberFansignInfoDto(mf.memberfansignId, afs.artistfansignId, afs.mode) " +
            "from MemberFansign mf " +
            "join mf.artistFansign afs " +
            "where FUNCTION('DATE_FORMAT', afs.endApplyTime, '%Y-%m-%d') = :current_date " +
            "and afs.status = 'APPLYING' ")
    List<MemberFansignInfoDto> getMemberFansignList(@Param("current_date") String current_date);

}
