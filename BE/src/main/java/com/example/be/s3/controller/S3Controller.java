package com.example.be.s3.controller;

import com.example.be.s3.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;

@RestController
@RequiredArgsConstructor
public class S3Controller {

    private final S3Uploader s3Uploader;

    @GetMapping("/image")
    public byte[] getImage(){
        try {
            byte[] bytes = s3Uploader.downloadFile();
            return bytes;
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
