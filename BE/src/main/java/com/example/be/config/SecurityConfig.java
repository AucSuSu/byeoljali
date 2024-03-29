package com.example.be.config;

import com.example.be.artist.repository.ArtistRepository;
import com.example.be.config.jwt.JwtAuthenticationFilter;
import com.example.be.config.jwt.JwtAuthorizationFilter;
import com.example.be.config.jwt.service.TokenService;
import com.example.be.config.redis.RedisService;
import com.example.be.fan.repository.FanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // secured라는 어노테이션 활성화, preAuthorize,postAuthorize 어노테이션 활성화
@RequiredArgsConstructor
public class SecurityConfig {

    private final ArtistRepository artistRepository;
    private final FanRepository fanRepository;
    private final TokenService tokenService;
    private final RedisService redisService;
    private final CorsConfig corsConfig;

    @Bean
    public BCryptPasswordEncoder encodePwd(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http.addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class); // CORS 필터를 가장 먼저 적용
        // Spring Security의 필터는 SecurityContextPersistenceFilter가 제일먼저 실행되는 필터이다
        http.csrf().disable(); // 접근방식, 데이터의 위조,변조가 발생하는가?

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 사용 X
                .and()
                .formLogin().disable()  // 폼 로그인 사용X
                .httpBasic().disable()  // http 요청이 올때 항상 headers의 Authorization : ID, PW를 보내는데 그걸 안하겠다.
                // Authorization : 토큰을 넣는 방식을 사용하기 위해서 !!
                // 이방식은 Basic 방식이 아닌 Bearer방식!
                .apply(new CustomFilter()) // 커스텀 필터 추가
                .and()
                .authorizeRequests()
                .antMatchers("/api/login", "/api/oauth").permitAll() // /api/login과 /api/oauth에 대한 접근을 누구나 할 수 있도록 허용
                .antMatchers("/api/**").access("hasRole('ROLE_FAN') or hasRole('ROLE_ARTIST')") // 기타 /api/** 경로는 ROLE_FAN, ROLE_ARTIST 역할을 가진 사용자만 접근 가능
                .anyRequest().permitAll()
                .and();

        return http.build();
    }

    public class CustomFilter extends AbstractHttpConfigurer<CustomFilter, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthenticationFilter(authenticationManager, redisService, tokenService))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, artistRepository, fanRepository, tokenService));
        }
    }
}
