package com.example.be.applicant.repository;

import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.artistfansign.dto.FansignResponseDto;

import java.util.List;

public interface CustomApplyPageRepository {
    List<ApplyPageDto> findAllApplyPageById(Long fanId);
}
