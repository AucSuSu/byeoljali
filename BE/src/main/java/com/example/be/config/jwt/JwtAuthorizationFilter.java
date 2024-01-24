package com.example.be.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.be.artist.entity.Artist;
import com.example.be.artist.repository.ArtistRepository;
import com.example.be.config.auth.PrincipalDetails;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 시큐리티가 filter를 가지고 있는데 그 필터중에 BasicAuthenticationFilter 라는 것이 있음
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터를 무조건 타게 되어있음.
// 만약에 권한이나 인증이 필요한 주소가 아니라면 이 필터를 안탄다.
// 인가
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private ArtistRepository artistRepository;
    private FanRepository fanRepository;
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, ArtistRepository artistRepository, FanRepository fanRepository) {
        super(authenticationManager);
        this.artistRepository = artistRepository;
        this.fanRepository = fanRepository;
    }

    // 인증이나 권한이 필요한 주소요청이 있을 때 해당 필터를 타게 됨.
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String jwtHeader = request.getHeader(JwtProperties.ACCESS_HEADER_STRING);
        // 요청 헤더에 Authorization 값이 없거나 Bearer로 시작하지 않으면
        // 즉 정상적인 사용자가 아니면 다음 필터로 넘기자
        if( jwtHeader == null || !jwtHeader.startsWith("Bearer")){
            chain.doFilter(request,response);
            return;
        }
        // Bearer를 제외한 token값만 꺼내기
        String token = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");
//
//        // 토큰 검증 (이게 인증이기 때문에 AuthenticationManager도 필요 없음)
//        // 내가 SecurityContext에 직접접근해서 세션을 만들때 자동으로 UserDetailsService에 있는

        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(JwtProperties.SECRET)).build().verify(token);

        // Artist ID 추출 (클레임이 없는 경우 null 처리)
        String artistId = decodedJWT.getClaim("artistId").toString();

        // username이 있다는 말은 사용자가 정상적으로 인증이 됐다는 뜻!
        if(!artistId.equals("Missing claim")){
            Artist artist = artistRepository.findById(Long.parseLong(artistId)).orElse(null);

            PrincipalDetails principalDetails = new PrincipalDetails(artist);
            // 사용자가 인증이 됐으니까 강제적으로 authentication 객체를 만들어줘도 되는거임 with principalDetails, null, authorities
            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails, null, principalDetails.getAuthorities());

            // 강제로 시큐리티의 세션에 authentication 객체를 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);

        }else{
            String fanId = decodedJWT.getClaim("fanId").toString();

            if(!fanId.equals("Missing claim")){
                Fan fan = fanRepository.findById(Long.parseLong(fanId)).orElse(null);

                FanPrincipalDetails fanPrincipalDetails = new FanPrincipalDetails(fan);
                // 사용자가 인증이 됐으니까 강제적으로 authentication 객체를 만들어줘도 되는거임 with principalDetails, null, authorities
                Authentication authentication = new UsernamePasswordAuthenticationToken(fanPrincipalDetails, null, fanPrincipalDetails.getAuthorities());

                // 강제로 시큐리티의 세션에 authentication 객체를 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
        // 다 했으니까 chain 타게하자.
        chain.doFilter(request, response);
    }
}
