package com.example.BE.config.jwt;

// 클라이언트에서 /login, POST방식으로 보내면 스프링 시큐리티에서 UsernamePasswordAuthenticationFilter가 호출됨

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.BE.artist.entity.Artist;
import com.example.BE.config.auth.PrincipalDetails;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    // /login 요청을 하면 로그인 시도를 위해서 아래 메소드가 실행된다. 로그인 성공시 return인 authentication이 세션에 저장됨.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        System.out.println("JwtAuthenticationFilter : 로그인 시도중");

        // username, password를 받는다.
        ObjectMapper om = new ObjectMapper();
        Artist artist = null;
        try {
            System.out.println(request.getInputStream());
            artist = om.readValue(request.getInputStream(), Artist.class);
            System.out.println(artist);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // username과 password로 authenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(artist.getEmail(), artist.getPassword());

        // PrincipalDetailsService의 loadUserByUsername() 메소드가 실행된 후 정상이면 authentication이 리턴됨.
        // 다시말해 전달받은 값과 DB에 있는 username, password가 일치한다는 뜻.
        Authentication authentication = authenticationManager.authenticate(authenticationToken);

        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("로그인 완료됨 : " + principalDetails.getArtist()); // 로그인이 정상적으로 되었다는 뜻.

        // authentication 객체를 return 해줘야 session 영역에 저장이 됨.
        // 그 저장된 값으로 꺼내써서 시큐리티가 대신 권한 관리를 한다. -> 편함
        // 굳이 JWT 토큰을 사용하면서 세션을 만들 이유가 없음. 근데 단지 권한 처리 때문에 session 넣어 준다.

        return authentication;

    }


    // attemptAuthentication 실행 후 인증이 정상적으로 되었으면 successfulAuthentication 메소드가 실행.
    // JWT 토큰을 만들어서 request 요청한 사용자에게 JWT 토큰을 response 해주면 된다.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        System.out.println("로그인이 완료되었으므로 JWT 토큰 생성하는 successfulAuthentication 실행");
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        // HMAC 방식의 access 토큰
        String accessToken = JWT.create()
                .withSubject(JwtProperties.ACCESS_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.ACCESS_EXPIRATION_TIME)) //30분
                .withClaim("artistId", principalDetails.getArtist().getArtistId())
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));

        // HMAC 방식의 refresh 토큰
        String refreshToken = JWT.create()
                .withSubject(JwtProperties.REFRESH_TOKEN)
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.REFRESH_EXPIRATION_TIME)) //30분
                .withClaim("artistId", principalDetails.getArtist().getArtistId())
                .sign(Algorithm.HMAC256(JwtProperties.SECRET));

        // 응답 헤더에 두 개의 토큰 추가
        response.addHeader(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX + accessToken);
        response.addHeader(JwtProperties.REFRESH_HEADER_STRING, JwtProperties.TOKEN_PREFIX + refreshToken);
    }
}
