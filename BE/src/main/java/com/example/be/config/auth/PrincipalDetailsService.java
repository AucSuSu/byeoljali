package com.example.be.config.auth;


import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
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
        if( artist != null) return new PrincipalDetails(artist);
        return null;
    }
}
