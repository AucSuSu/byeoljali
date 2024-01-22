package com.example.BE.applicant.repository;

import com.example.BE.applicant.dto.ApplyPageDto;
import com.example.BE.applicant.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {

//    @Query("SELECT af.title, af.posterImageUrl, m.name " +
//            "FROM MemberFansign mf " +
//            "JOIN FETCH mf.artistFansign af " +
//            "JOIN FETCH mf.member m")
//    List<ApplyPageDto> findApplyPageAllFetchJoin(Long fanId);

}
