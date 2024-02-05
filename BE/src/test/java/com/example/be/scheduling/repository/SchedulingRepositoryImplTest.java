package com.example.be.scheduling.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.artistfansign.repository.ArtistFansignRepository;
import com.example.be.member.entity.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

// 스케줄링이 잘 되는지 봐야함으로 서비스 단을 같이 확인해야함
@SpringBootTest
@Transactional
@Rollback(value = true)
class SchedulingRepositoryImplTest {

    @Autowired
    SchedulingRepository schedulingRepository;
    @Autowired
    ArtistRepository artistRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    ArtistFansignRepository artistFansignRepository;
    @Autowired
    MemberFansignRepository memberFansignRepository;

    @Test
    void 응모마감상태변경_test(){

        // 아티스트
        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        artistRepository.save(artist1);

        // 멤버 개설
        Member member1 = new Member(artist1, "member1", "imageurl1");
        Member member2 = new Member(artist1, "member2", "imageurl1");
        memberRepository.save(member1);
        memberRepository.save(member2);

        // 응모시작날짜 (2024-01-30)
        // 응모마감날짜 (오늘)
        // 팬싸인회 시작날짜 (2025-01-30)
        LocalDateTime startApplyDate = LocalDateTime.of(2024, 1, 30, 23,00);
        LocalDateTime startFansignDate = LocalDateTime.of(2025, 1, 30, 23,00);
        LocalDateTime endApplyTime = LocalDateTime.now();
        String today = "2024-02-05";


        // 아티스트 팬싸인회 - 오늘 마감인 팬싸인회
        ArtistFansign artistFansign = new ArtistFansign("title7",
                "posterImage7",
                "information1",
                startApplyDate, endApplyTime, startFansignDate, FansignStatus.APPLYING, FansignMode.RANDOM, artist1);
        artistFansignRepository.save(artistFansign);

        // 맴버 팬싸인회 개설
        MemberFansign memberFansign1 = new MemberFansign(artistFansign, member1);
        MemberFansign memberFansign2 = new MemberFansign(artistFansign, member2);
        memberFansignRepository.save(memberFansign1);
        memberFansignRepository.save(memberFansign2);

        schedulingRepository.updateStatusToEndApply(today);

        // update 문이므로 영속성 context 초기화
        ArtistFansign findArtistFansign = artistFansignRepository.findById(artistFansign.getArtistfansignId()).get();

        assertThat(findArtistFansign.getStatus()).isEqualTo(FansignStatus.READY_FANSIGN);
    }

    @Test
    void 응모상태변경_test(){

        // 아티스트
        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        artistRepository.save(artist1);

        // 멤버 개설
        Member member1 = new Member(artist1, "member1", "imageurl1");
        Member member2 = new Member(artist1, "member2", "imageurl1");
        memberRepository.save(member1);
        memberRepository.save(member2);

        // 날짜
        // 응모시작날짜 (오늘)
        // 응모마감날짜 (2025-01-30)
        // 팬싸인회 시작날짜 (2026-01-30)
        LocalDateTime startApplyDate = LocalDateTime.now();
        LocalDateTime endApplyTime = LocalDateTime.of(2025, 1, 30, 23,00);
        LocalDateTime startFansignDate = LocalDateTime.of(2026, 1, 30, 23,00);
        String today = "2024-02-05";


        // 응모시작날짜 (오늘)
        // 응모마감날짜 (내일)
        // 팬싸인회 시작날짜 (2025)

        // 아티스트 팬싸인회 - 오늘 응모시작인 팬싸인회
        ArtistFansign artistFansign = new ArtistFansign("title7",
                "posterImage7",
                "information1",
                startApplyDate, endApplyTime, startFansignDate, FansignStatus.READY_APPLYING, FansignMode.RANDOM, artist1);
        artistFansignRepository.save(artistFansign);

        // 맴버 팬싸인회 개설
        MemberFansign memberFansign1 = new MemberFansign(artistFansign, member1);
        MemberFansign memberFansign2 = new MemberFansign(artistFansign, member2);
        memberFansignRepository.save(memberFansign1);
        memberFansignRepository.save(memberFansign2);

        schedulingRepository.updateStatusToApplying(today);

        // update 문이므로 영속성 context 초기화
        ArtistFansign findArtistFansign = artistFansignRepository.findById(artistFansign.getArtistfansignId()).get();

        assertThat(findArtistFansign.getStatus()).isEqualTo(FansignStatus.APPLYING);
    }

    @Test
    void 팬싸인회_상태변경_test(){

        // 아티스트
        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        artistRepository.save(artist1);

        // 멤버 개설
        Member member1 = new Member(artist1, "member1", "imageurl1");
        Member member2 = new Member(artist1, "member2", "imageurl1");
        memberRepository.save(member1);
        memberRepository.save(member2);

        // 날짜
        // 응모시작날짜 (2023-01-30)
        // 응모마감날짜 (2024-01-30)
        // 팬싸인회 시작날짜 (오늘)
        LocalDateTime startApplyDate = LocalDateTime.of(2023, 1, 30, 23,00);
        LocalDateTime endApplyTime = LocalDateTime.of(2024, 1, 30, 23,00);
        LocalDateTime startFansignDate = LocalDateTime.now();

        LocalDateTime date = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH");
        String formattedDate = date.format(formatter);


        // 아티스트 팬싸인회 - 오늘 응모시작인 팬싸인회
        ArtistFansign artistFansign = new ArtistFansign("title7",
                "posterImage7",
                "information1",
                startApplyDate, endApplyTime, startFansignDate, FansignStatus.SESSION_CONNECTED, FansignMode.RANDOM, artist1);
        artistFansignRepository.save(artistFansign);

        // 맴버 팬싸인회 개설
        MemberFansign memberFansign1 = new MemberFansign(artistFansign, member1);
        MemberFansign memberFansign2 = new MemberFansign(artistFansign, member2);
        memberFansignRepository.save(memberFansign1);
        memberFansignRepository.save(memberFansign2);

        schedulingRepository.updateStatusToFansign(formattedDate);

        // update 문이므로 영속성 context 초기화
        ArtistFansign findArtistFansign = artistFansignRepository.findById(artistFansign.getArtistfansignId()).get();

        assertThat(findArtistFansign.getStatus()).isEqualTo(FansignStatus.FANSIGN);
    }

}