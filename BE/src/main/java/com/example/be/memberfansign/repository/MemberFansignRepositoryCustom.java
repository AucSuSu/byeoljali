package com.example.be.memberfansign.repository;


import com.example.be.memberfansign.dto.MemberFansignResponseDto;
import com.example.be.memberfansign.entity.MemberFansign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberFansignRepositoryCustom {

    MemberFansignResponseDto getMemberfansignDetail(Long memberfansignId);
}
