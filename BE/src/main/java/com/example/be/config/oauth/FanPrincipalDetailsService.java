package com.example.be.config.oauth;

import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FanPrincipalDetailsService extends DefaultOAuth2UserService {

    private final FanRepository fanRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        System.out.println("getClientRegistration : " + userRequest.getClientRegistration()); // registrationId로 어떤 OAuth로 로그인
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        // 구글로그인 버튼 클릭 -> 구글로그인창 -> 로그인을 완료 -> code를 리턴(OAuth-Client 라이브러리) -> AccessToken요청
        // 여기까지가 userRequest정보 -> 회원프로필을 받아야함 그때 사용되는 메소드가(loadUser메소드) -> 구글로부터 회원프로필을 받았다.

        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();
        String providerId = oAuth2User.getAttribute("sub");
        String username = provider + "_" + providerId; // google_107157108223565402072
//        String password = bCryptPasswordEncoder.encode("1234");
        String email = oAuth2User.getAttribute("email");
        String role = "ROLE_FAN";

        Fan fan = fanRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("해당 이메일을 가진 회원이 존재하지 않습니다."));

        // OAuth2로 로그인시 그 정보들로 우리 DB에 회원가입
//        if(fan == null){
//            fan = new Fan()
//            fanRepository.save(fan);
//        }

//        return new PrincipalDetails(user, oAuth2User.getAttributes());
        return null;
    }
}
