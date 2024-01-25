package com.example.be.fan.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class FanMyPageUpdateRequestDto {

    private String name;
    private String nickname;
    private MultipartFile profileImage;

}