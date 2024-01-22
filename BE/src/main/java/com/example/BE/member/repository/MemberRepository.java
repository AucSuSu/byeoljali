package com.example.BE.member.repository;

import com.example.BE.artistfansign.entity.ArtistFansign;
import com.example.BE.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository  extends JpaRepository<Member, Long> {
}
