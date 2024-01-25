package com.example.be.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    // 기본 사진 업로드
    public String upload(MultipartFile multipartFile, String dirName, String name) throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile, dirName, name);
    }

    // 팬싸인회 포스터 업로드
    public String uploadPoster(MultipartFile multipartFile, String dirName, String name, LocalDateTime localDateTime) throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return uploadPoster(uploadFile, dirName, name, localDateTime);
    }

    private String uploadPoster(File uploadFile, String dirName, String name, LocalDateTime localDateTime){
        String fileName = dirName + "/" + name + "/" + uploadFile.getName() + localDateTime.toString();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    private String upload(File uploadFile, String dirName, String name){
        String fileName = dirName + "/" + name + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    private String putS3(File uploadFile, String fileName){
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead) // PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile){
        if (targetFile.delete()){
            log.info("파일이 삭제되었습니다.");
        }else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file) throws IOException{
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()){
            try (FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }

}
