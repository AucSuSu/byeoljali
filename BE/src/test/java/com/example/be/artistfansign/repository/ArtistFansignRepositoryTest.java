package com.example.be.artistfansign.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.artistfansign.dto.ArtistsMyFansignResponseDto;
import com.example.be.artistfansign.dto.FansignResponseDto;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import com.example.be.member.entity.Member;
import com.example.be.member.repository.MemberRepository;
import com.example.be.memberfansign.entity.MemberFansign;
import com.example.be.memberfansign.repository.MemberFansignRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
@Rollback(value = true)
class ArtistFansignRepositoryTest {

    @Autowired
    ArtistFansignRepository artistFansignRepository;
    @Autowired
    ArtistRepository artistRepository;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MemberFansignRepository memberFansignRepository;
    @Autowired
    FanRepository fanRepository;

    @Test
    public void 최근만들어진_팬싸인회_3개_가져오기_테스트() throws Exception{

        LocalDateTime date1 = LocalDateTime.now();

        // 아티스트
        Artist artist = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        artistRepository.save(artist);

        ArtistFansign artistFansign7 = new ArtistFansign("title7", "posterImage7", "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist);
        ArtistFansign artistFansign8 = new ArtistFansign("title8", null, "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist);
        ArtistFansign artistFansign9 = new ArtistFansign("title9", "posterImage9", "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist);
        ArtistFansign artistFansign10 = new ArtistFansign("title10", "posterImage10", "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist);

        artistFansignRepository.save(artistFansign7);
        artistFansignRepository.save(artistFansign8);
        artistFansignRepository.save(artistFansign9);
        artistFansignRepository.save(artistFansign10);

        // when
        List<RecentFansignResponseDto> list = artistFansignRepository.findTop3ByOrderByCreatedDateDesc();
        System.out.println(list.get(0));
        System.out.println(list.get(1));
        System.out.println(list.get(2));
        assertThat(list.get(0).getArtistfansignId()).isEqualTo(artistFansign10.getArtistfansignId());
        assertThat(list.get(1).getArtistfansignId()).isEqualTo(artistFansign9.getArtistfansignId());
        // 이미지가 null인 경우엔 top3 에서 제외됨
        assertThat(list.get(2).getArtistfansignId()).isEqualTo(artistFansign7.getArtistfansignId());
    }

    @Test
    public void 아티스트_내가개설한_팬싸인회_전부가져오기_테스트() throws Exception{

        // given
        LocalDateTime date1 = LocalDateTime.now();

        // 아티스트
        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        Artist artist2 = Artist.createArtist("unknown2@naver.com", "password", "unknown2");

        artistRepository.save(artist1);
        artistRepository.save(artist2);

        // 아티스트 멤버 추가
        Member member1 = new Member(artist1, "member1", "imageurl1");
        Member member2 = new Member(artist1, "member2", "imageurl1");
        Member member3 = new Member(artist1, "member3", "imageurl1");
        Member member4 = new Member(artist2, "member4", "imageurl1");

        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);
        memberRepository.save(member4);

        //아티스트 팬싸인회 개설
        ArtistFansign artistFansign7 = new ArtistFansign("title7", "posterImage7", "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist1);
        ArtistFansign artistFansign8 = new ArtistFansign("title8", null, "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist1);
        ArtistFansign artistFansign9 = new ArtistFansign("title7", "posterImage7", "information1",
                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
                ,artist2);

        artistFansignRepository.save(artistFansign7);
        artistFansignRepository.save(artistFansign8);
        artistFansignRepository.save(artistFansign9);

        //멤버 팬싸인회 개설
        MemberFansign memberFansign1 = new MemberFansign(artistFansign7, member1);
        MemberFansign memberFansign2 = new MemberFansign(artistFansign7, member2);
        MemberFansign memberFansign3 = new MemberFansign(artistFansign8, member1);
        MemberFansign memberFansign4 = new MemberFansign(artistFansign9, member4);
        memberFansignRepository.save(memberFansign1);
        memberFansignRepository.save(memberFansign2);
        memberFansignRepository.save(memberFansign3);
        memberFansignRepository.save(memberFansign4);

        List<ArtistsMyFansignResponseDto> list =
        artistFansignRepository.findArtistsMyFansign(artist1, FansignStatus.FINISH);
        List<Long> id_list = list.stream()
                .map(ArtistsMyFansignResponseDto::getMemberFansignId)
                .collect(Collectors.toList());

        assertThat(id_list).containsOnly(memberFansign1.getMemberfansignId(), memberFansign2.getMemberfansignId(), memberFansign3.getMemberfansignId());
    }

    @Test
    public void 팬_팬싸인회_전부가져오기_테스트_keyword_status() throws Exception{

        // given
        LocalDateTime date1 = LocalDateTime.now();

        // 팬
        Fan fan = new Fan("ww71er@naver.com", "profile", "김아림", "리미",
                LocalDate.now(), "certImage", 4, false);

        fanRepository.save(fan);

        // 아티스트
        Artist artist1 = Artist.createArtist("unknown1@naver.com", "password", "unknown1");
        Artist artist2 = Artist.createArtist("unknown2@naver.com", "password", "unknown2");

        artistRepository.save(artist1);
        artistRepository.save(artist2);

        // 아티스트 멤버 추가
        Member member1 = new Member(artist1, "member1", "imageurl1");
        Member member2 = new Member(artist1, "member2", "imageurl1");
        Member member3 = new Member(artist1, "member3", "imageurl1");
        Member member4 = new Member(artist2, "member4", "imageurl1");

        memberRepository.save(member1);
        memberRepository.save(member2);
        memberRepository.save(member3);
        memberRepository.save(member4);

        System.out.println("artists' member: "+artist1.getMemberList());

        //아티스트 팬싸인회 개설
        ArtistFansign artistFansign7 = new ArtistFansign("title7", "posterImage7", "information1",
                date1, date1, date1, FansignStatus.READY_APPLYING, FansignMode.RANDOM
                ,artist1);
        ArtistFansign artistFansign8 = new ArtistFansign("title8", null, "information1",
                date1, date1, date1, FansignStatus.APPLYING, FansignMode.RANDOM
                ,artist1);
        ArtistFansign artistFansign9 = new ArtistFansign("title9", "posterImage9", "information1",
                date1, date1, date1, FansignStatus.READY_APPLYING, FansignMode.RANDOM
                ,artist2);
        ArtistFansign artistFansign10 = new ArtistFansign("title10", "posterImage10", "information1",
                date1, date1, date1, FansignStatus.APPLYING, FansignMode.RANDOM
                ,artist2);
        artistFansignRepository.save(artistFansign7);
        artistFansignRepository.save(artistFansign8);
        artistFansignRepository.save(artistFansign9);
        artistFansignRepository.save(artistFansign10);

        //멤버 팬싸인회 개설
        MemberFansign memberFansign1 = new MemberFansign(artistFansign7, member1);
        MemberFansign memberFansign2 = new MemberFansign(artistFansign7, member2);
        MemberFansign memberFansign3 = new MemberFansign(artistFansign8, member1);
        MemberFansign memberFansign4 = new MemberFansign(artistFansign9, member4);
        MemberFansign memberFansign5 = new MemberFansign(artistFansign10, member4);

        memberFansignRepository.save(memberFansign1);
        memberFansignRepository.save(memberFansign2);
        memberFansignRepository.save(memberFansign3);
        memberFansignRepository.save(memberFansign4);
        memberFansignRepository.save(memberFansign5);

        // unknown1의 팬싸인회만 가져오기 + 응모 대기중인 팬싸인회
        String artistNameKeyword1 = "unknown1";
        String orderCondition1 = "approaching";
        List<FansignResponseDto> list1 =
                artistFansignRepository.findArtistFansignAndApplyInfo(fan, artistNameKeyword1, orderCondition1, FansignStatus.READY_APPLYING);
        List<Long> id_list1 = list1.stream()
                .map(FansignResponseDto::getArtistfansignId)
                .collect(Collectors.toList());

        assertThat(id_list1).containsOnly(artistFansign7.getArtistfansignId());

        // keyword 없이 + 응모대기중인 팬싸인회 가져오기
        String artistNameKeyword2 = null;
        String orderCondition2 = "approaching";
        List<FansignResponseDto> list2 =
                artistFansignRepository
                        .findArtistFansignAndApplyInfo(fan, artistNameKeyword2, orderCondition2, FansignStatus.READY_APPLYING);
        List<Long> id_list2 = list2.stream()
                .map(FansignResponseDto::getArtistfansignId)
                .collect(Collectors.toList());

        assertThat(id_list2).containsOnly(artistFansign7.getArtistfansignId(), artistFansign9.getArtistfansignId());

    }
}