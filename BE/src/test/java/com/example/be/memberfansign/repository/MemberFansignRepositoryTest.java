//package com.example.be.memberfansign.repository;
//
//import com.example.be.artist.entity.Artist;
//import com.example.be.artist.repository.ArtistRepository;
//import com.example.be.artistfansign.entity.ArtistFansign;
//import com.example.be.artistfansign.entity.FansignMode;
//import com.example.be.artistfansign.entity.FansignStatus;
//import com.example.be.artistfansign.repository.ArtistFansignRepository;
//import com.example.be.member.entity.Member;
//import com.example.be.member.repository.MemberRepository;
//import com.example.be.memberfansign.dto.MemberFansignResponseDto;
//import com.example.be.memberfansign.entity.MemberFansign;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//@Rollback(value = true)
//class MemberFansignRepositoryTest {
//
//    @Autowired
//    MemberFansignRepository memberFansignRepository;
//
//    @Autowired
//    ArtistRepository artistRepository;
//    @Autowired
//    MemberRepository memberRepository;
//    @Autowired
//    ArtistFansignRepository artistFansignRepository;
//    @Test
//    public void 멤버팬싸인회_상세보기_test() {
//
//        // 아티스트
//        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
//        artistRepository.save(artist1);
//
//        // 멤버 개설
//        Member member1 = new Member(artist1, "member1", "imageurl1");
//        Member member2 = new Member(artist1, "member2", "imageurl1");
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//
//        // 날짜
//        LocalDateTime date1 = LocalDateTime.now();
//
//        // 아티스트 팬싸인회
//        ArtistFansign artistFansign = new ArtistFansign("title7",
//                "posterImage7",
//                "information1",
//                date1, date1, date1, FansignStatus.READY_APPLYING, FansignMode.RANDOM, artist1);
//        artistFansignRepository.save(artistFansign);
//
//        // 맴버 팬싸인회 개설
//        MemberFansign memberFansign1 = new MemberFansign(artistFansign, member1);
//        MemberFansign memberFansign2 = new MemberFansign(artistFansign, member2);
//        memberFansignRepository.save(memberFansign1);
//        memberFansignRepository.save(memberFansign2);
//
//        // 상세보기 맞게 가져오기
//        MemberFansignResponseDto result = memberFansignRepository.getMemberfansignDetail(memberFansign1.getMemberfansignId());
//        assertThat(result.getMemberFansignId()).isEqualTo(memberFansign1.getMemberfansignId());
//        assertThat(result.getArtistFansignId()).isEqualTo(artistFansign.getArtistfansignId());
//        assertThat(result.getMemberName()).isEqualTo(member1.getName());
//    }
//}