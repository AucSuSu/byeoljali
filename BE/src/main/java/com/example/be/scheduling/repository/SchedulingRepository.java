package com.example.be.scheduling.repository;

import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.winning.dto.WinningInsertDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SchedulingRepository extends JpaRepository<ArtistFansign, Long>, SchedulingRepositoryCustom {
    @Query("select mf " +
            "from MemberFansign mf " +
            "join mf.artistFansign afs " +
            "where FUNC('DATE_FORMAT', afs.endApplyTime, '%Y-%m-%d') = FUNC( :current_date ) " +
            "and afs.status = :status ")
    List<MemberFansign> getMemberFansignList(@Param("current_date") String current_date, @Param("status") String status);

    @Query()
    List<WinningInsertDto> getWinningInsertDto(@Param("memberFansignId") Long memberFansignId);
}
