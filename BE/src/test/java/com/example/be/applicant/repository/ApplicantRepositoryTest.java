//package com.example.be.applicant.repository;
//
//import com.example.be.applicant.dto.ApplyFormResponseDto;
//import com.example.be.artist.entity.Artist;
//import com.example.be.artist.repository.ArtistRepository;
//import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
//import com.example.be.artistfansign.dto.FansignResponseDto;
//import com.example.be.artistfansign.entity.ArtistFansign;
//import com.example.be.artistfansign.entity.FansignMode;
//import com.example.be.artistfansign.entity.FansignStatus;
//import com.example.be.artistfansign.repository.ArtistFansignRepository;
//import com.example.be.member.entity.Member;
//import com.example.be.member.repository.MemberRepository;
//import com.example.be.memberfansign.entity.MemberFansign;
//import com.example.be.memberfansign.repository.MemberFansignRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Rollback;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//@Rollback(value = true)
//class ApplicantRepositoryTest {
//
//    @Autowired
//    ApplicantRepository applicantRepository;
//
//    @Autowired
//    ArtistRepository artistRepository;
//
//    @Autowired
//    ArtistFansignRepository artistFansignRepository;
//
//    @Autowired
//    MemberRepository memberRepository;
//
//    @Autowired
//    MemberFansignRepository memberFansignRepository;
//
//    @Test
//    public void 응모내역_페이지_전부_가져오기_테스트() throws Exception{
//        LocalDateTime date1 = LocalDateTime.now();
//
//
//    }
//
//    @Test
//    public void 응모폼_생성하기_데이터_테스트() throws Exception{
//        LocalDateTime date1 = LocalDateTime.now();
//
//        // 아티스트
//        Artist artist = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
//        Artist artist2 = Artist.createArtist("unknown2@naver.com", "password", "unknown1");
//        artistRepository.save(artist);
//        artistRepository.save(artist2);
//
//        // 멤버
//        // 아티스트 멤버 추가
//        Member member1 = new Member(artist, "member1", "imageurl1");
//        Member member2 = new Member(artist, "member2", "imageurl1");
//        Member member3 = new Member(artist, "member3", "imageurl1");
//        Member member4 = new Member(artist2, "member4", "imageurl1");
//
//        member1.setArtist(artist);
//        member2.setArtist(artist);
//        member3.setArtist(artist);
//        member4.setArtist(artist2);
//
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        memberRepository.save(member3);
//        memberRepository.save(member4);
//
//        // 해당 아티스트의 팬싸인회
//        ArtistFansign artistFansign1 = new ArtistFansign("title1", "posterImage1", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,artist);
//        ArtistFansign artistFansign2 = new ArtistFansign("title1", "posterImage1", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,artist2);
//
//        artistFansignRepository.save(artistFansign1);
//        artistFansignRepository.save(artistFansign2);
//
//        //멤버 팬싸인회 개설
//        MemberFansign memberFansign1 = new MemberFansign(artistFansign1, member1);
//        MemberFansign memberFansign2 = new MemberFansign(artistFansign1, member2);
//        MemberFansign memberFansign3 = new MemberFansign(artistFansign1, member3);
//        MemberFansign memberFansign4 = new MemberFansign(artistFansign2, member4);
//        memberFansignRepository.save(memberFansign1);
//        memberFansignRepository.save(memberFansign2);
//        memberFansignRepository.save(memberFansign3);
//        memberFansignRepository.save(memberFansign4);
//
//        memberFansign1.setArtistFansign(artistFansign1);
//        memberFansign2.setArtistFansign(artistFansign1);
//        memberFansign3.setArtistFansign(artistFansign1);
//        memberFansign4.setArtistFansign(artistFansign2);
//
//        System.out.println("is connected: "+memberFansign1.getArtistFansign().getArtistfansignId());
//
//        // when
//        Long artistfansign_id = artistFansign1.getArtistfansignId(); // 팬싸인회 ID 가져오기
//
//        Optional<ArtistFansign> artistFansignOptional =artistFansignRepository.findById(artistfansign_id);
//
//
//        System.out.println("artistfansignId: "+artistfansign_id);
//        if (artistFansignOptional.isPresent()) {
//            ArtistFansign artistFansign = artistFansignOptional.get();
//            System.out.println("artist: "+artistFansign);
//
//            // artistFansign의 artist 필드를 통해 members 조회
//            List<MemberFansign> memberFansignList = artistFansign.getMemberFansignList();
//            System.out.println(memberFansignList);
//
//            List<Member> members = memberFansignList.stream()
//                    .map(MemberFansign::getMember)
//                    .collect(Collectors.toList());
//            // 이제 members를 사용할 수 있음
//            assertThat(members).containsOnly(member1, member2, member3);
//        } else {
//            // 해당 ID에 해당하는 엔티티가 없을 때의 처리
//            System.out.println("해당 id에 맞는 entity를 못찾았다.");
//        }
//
//    }
//
//
//}