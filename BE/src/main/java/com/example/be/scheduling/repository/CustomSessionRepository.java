package com.example.be.scheduling.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.memberfansign.entity.MemberFansign;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface CustomSessionRepository {

    List<MemberFansign> getMemberFansignList(LocalDateTime now);
}
