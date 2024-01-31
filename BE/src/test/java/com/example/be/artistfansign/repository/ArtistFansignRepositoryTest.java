package com.example.be.artistfansign.repository;

import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.artistfansign.dto.RecentFansignResponseDto;
import com.example.be.artistfansign.entity.ArtistFansign;
import com.example.be.artistfansign.entity.FansignMode;
import com.example.be.artistfansign.entity.FansignStatus;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ArtistFansignRepositoryTest {

    @Autowired
    ArtistFansignRepository artistFansignRepository;
    @Autowired
    ArtistRepository artistRepository;

//    @PostConstruct
//    public void init() {
//
//        // 아티스트
//        LocalDateTime date1 = LocalDateTime.now();
//        Artist arim = Artist.createArtist("arim@naver.com", "password", "arim");
//        Artist woomi = Artist.createArtist("woomi@naver.com", "password", "woomi");
//        Artist ttaho = Artist.createArtist("ttaho@naver.com", "password", "ttaho");
//        Artist rael = Artist.createArtist("rael@naver.com", "password", "rael");
//        Artist munsoo = Artist.createArtist("munsoo@naver.com", "password", "munsoo");
//        Artist dogfish = Artist.createArtist("dogfish@naver.com", "password", "dogfish");
//        artistRepository.save(arim);
//        artistRepository.save(woomi);
//        artistRepository.save(ttaho);
//        artistRepository.save(rael);
//        artistRepository.save(munsoo);
//        artistRepository.save(dogfish);
//
//        // 아티스트 팬싸인회
//        ArtistFansign artistFansign1 = new ArtistFansign("title1", "posterImage1", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,arim);
//        ArtistFansign artistFansign2 = new ArtistFansign("title2", "posterImage2", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,woomi);
//        ArtistFansign artistFansign3 = new ArtistFansign("title3", "posterImage3", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,ttaho);
//        ArtistFansign artistFansign4 = new ArtistFansign("title4", null, "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,rael);
//        ArtistFansign artistFansign5 = new ArtistFansign("title5", "posterImage5", "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,munsoo);
//        ArtistFansign artistFansign6 = new ArtistFansign("title6", null, "information1",
//                date1, date1, date1, FansignStatus.FINISH, FansignMode.RANDOM
//                ,dogfish);
//
//        artistFansignRepository.save(artistFansign1);
//        artistFansignRepository.save(artistFansign2);
//        artistFansignRepository.save(artistFansign3);
//        artistFansignRepository.save(artistFansign4);
//        artistFansignRepository.save(artistFansign5);
//        artistFansignRepository.save(artistFansign6);
//
//    }
    @Test
    public void 최근만들어진_팬싸인회_3개_가져오기_테스트() throws Exception{

        // given
        LocalDateTime date1 = LocalDateTime.now();

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
        Thread.sleep(100);
        artistFansignRepository.save(artistFansign8);
        Thread.sleep(100);
        artistFansignRepository.save(artistFansign9);
        Thread.sleep(100);
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
        Thread.sleep(100);
        artistFansignRepository.save(artistFansign8);
        Thread.sleep(100);
        artistFansignRepository.save(artistFansign9);
        Thread.sleep(100);
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
}