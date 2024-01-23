package com.example.be.applicant.repository;

import com.example.be.applicant.dto.ApplyPageDetailDto;
import com.example.be.applicant.dto.ApplyPageDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomApplyPageRepository {
    // 응모한 모든 팬싸 보여주기
    List<ApplyPageDto> findAllApplyPageById(Long fanId);

    // 선택된 페이지 클릭 시, 응모 상세 페이지
//    ApplyPageDetailDto findDetailFSBymemberFSId(Long memberFansignId, Long fanId);
}
