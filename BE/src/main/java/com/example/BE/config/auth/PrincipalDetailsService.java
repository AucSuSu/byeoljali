package com.example.BE.config.auth;

import com.example.BE.artist.entity.Artist;
import com.example.BE.artist.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final ArtistRepository artistRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Artist artist = artistRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));
        System.out.println("여기여기여기");
        if( artist != null) return new PrincipalDetails(artist);
        System.out.println("여기까지옴");
        return null;
    }
}
