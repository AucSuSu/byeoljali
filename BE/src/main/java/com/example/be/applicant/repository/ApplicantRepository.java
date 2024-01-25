package com.example.be.applicant.repository;

import com.example.be.applicant.dto.ApplyPageDetailDto;
import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.applicant.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long>, CustomApplyPageRepository{

    // 입력받은 artistfansignId 와 memberId로
    // memberfansignId 찾아주기
    @Query("select mf.memberfansignId from MemberFansign mf join mf.artistFansign af join mf.member m"
            + " where af.artistfansignId = :artistfansignId"
            + " and m.memberId = :memberId")
    Long findMemberFSIdByMemberIdandArtistFSId(@Param("artistfansignId") Long artistfansignId, @Param("memberId") Long memberId);

}