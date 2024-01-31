package com.example.be.artist.repository;

import com.example.be.artist.entity.Artist;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(value = true)
class ArtistRepositoryTest {

    @Autowired
    ArtistRepository artistRepository;
//    @Test
//    public void 이메일로_아티스트찾기_테스트(){
//        Artist artist = Artist.createArtist("ww71er@naver.com", "password", "arim");
//        artistRepository.save(artist);
//
//        // Optional 에서 값을 꺼내므로 get으로 했는데 맞는지 모르겠음 ^^&...
//        Artist findArtist = artistRepository.findByEmail(artist.getEmail()).get();
//        assertThat(findArtist).isEqualTo(artist);
//    }
}