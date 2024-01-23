package com.example.be.config;

import com.example.be.artist.repository.ArtistRepository;
import com.example.be.config.jwt.JwtAuthenticationFilter;
import com.example.be.config.jwt.JwtAuthorizationFilter;
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

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // secured라는 어노테이션 활성화, preAuthorize,postAuthorize 어노테이션 활성화
@RequiredArgsConstructor
public class SecurityConfig {

    private final ArtistRepository artistRepository;
    private final CorsConfig corsConfig;

    @Bean
    public BCryptPasswordEncoder encodepwd(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

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
//                .antMatchers("/artist/**") // 여기에 권한추가해줘야함
//                .access("hasRole('ROLE_ARTIST')")
                .anyRequest().permitAll();

        return http.build();


//        http.logout() // 로그아웃 기능 작동함
//                .logoutUrl("/logout") // 로그아웃 처리 URL, default: /logout, 원칙적으로 post 방식만 지원
//                .logoutSuccessUrl("/logoutSuccess"); // 로그아웃 성공 후 이동페이지

    }

    public class CustomFilter extends AbstractHttpConfigurer<CustomFilter, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthenticationFilter(authenticationManager))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, artistRepository));
        }
    }
}
