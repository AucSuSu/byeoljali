package com.example.be.memberfansign.repository;


import com.example.be.memberfansign.dto.MemberFansignResponseDto;
import com.example.be.memberfansign.entity.MemberFansign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberFansignRepository  extends JpaRepository<MemberFansign, Long> , MemberFansignRepositoryCustom{

}
