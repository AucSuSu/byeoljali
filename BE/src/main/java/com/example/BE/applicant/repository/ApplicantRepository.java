package com.example.BE.applicant.repository;

import com.example.BE.applicant.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

//    @Query("SELECT af.title, af.posterImageUrl, m.name " +
//            "FROM MemberFansign mf " +
//            "JOIN FETCH mf.artistFansign af " +
//            "JOIN FETCH mf.member m")
//    List<ApplyPageDto> findAllFetchJoin(Long fanId);

    // 입력받은 artistfansignId 와 memberId로
    // memberfansignId 찾아주기
    @Query("select mf.memberfansignId from MemberFansign mf join mf.artistFansign af join mf.member m"
            + " where af.artistfansignId = :artistfansignId"
            + " and m.memberId = :memberId")
    Long findMemberFSIdByMemberIdandArtistFSId(@Param("artistfansignId") Long artistfansignId, @Param("memberId") Long memberId);
}