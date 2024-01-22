package com.example.BE.applicant.service;

import com.example.BE.applicant.dto.ApplyPageDto;
import com.example.BE.applicant.Applicant;
import com.example.BE.applicant.repository.ApplicantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicantService {

    private final ApplicantRepository applicantRepository;

//    public ApplyPageDto findById(Long id){
//
//        Applicant applicant = applicantRepository.findById(id).
//                orElseThrow(() -> new IllegalArgumentException("해당 응모자 정보가 없습니다."));
//
//        List<ApplyPageDto> result = applicantRepository.findAllFetchJoin(applicant.getApplicantId());
//
//        return new ApplyPageDto(entity.getPosterImageUrl(), entity.getTitle(), entity.get);
//    }

}
