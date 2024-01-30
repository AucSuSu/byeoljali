package com.example.be.s3;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.FileNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class S3UploaderTest {

    @Autowired
    S3Uploader s3Uploader;

    @Test
    public void testDownloadFile() throws FileNotFoundException {
        String fileName = "arn:aws:s3:::testbyeoljari/artist/NctDream/nctDream.jpg";

        byte[] bytes = s3Uploader.downloadFile(fileName);
    }

}