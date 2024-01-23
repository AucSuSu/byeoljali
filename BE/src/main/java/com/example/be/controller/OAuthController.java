package com.example.be.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OAuthController {

    @GetMapping("/oauth")
    public String oauth(@RequestParam("code") String code){

        System.out.println(code);
        return code;
    }
}
