package com.example.be.s3;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.example.be.config.oauth.FanPrincipalDetails;
import com.example.be.fan.entity.Fan;
import com.example.be.fan.repository.FanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

/**
 * AWS s3 업로드를 위한 클래스
 * 해당 클래스는 5가지 종류의 이미지를 업로드하는걸 구현했다.
 * 아티스트 프로필 멤버 프로필, 팬싸인회 포스터, 아티스트 멤버 프로필, 팬이 맞는지 검증하는 검증용, 팬의 인생네컷
 */


@Slf4j
@Service
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;
    private final FanRepository fanRepository;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public byte[] downloadFile() throws FileNotFoundException {

        Fan fan = getFan();
        Fan readFan = fanRepository.findById(fan.getFanId()).orElseThrow(() -> new IllegalArgumentException("회원이 없습니다"));
        String fileName = "fan/" +readFan.getEmail() + "/certificate/certImage.jpg";
        validateFileExists(fileName);

        S3Object object = amazonS3Client.getObject(bucket, fileName);
        S3ObjectInputStream objectContent = object.getObjectContent();

        try {
            byte[] byteArray = IOUtils.toByteArray(objectContent);
            return Base64.encodeBase64(byteArray);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private void validateFileExists(String fileName) throws FileNotFoundException {
        if(!amazonS3Client.doesObjectExist(bucket, fileName))
            throw new FileNotFoundException();
    }

    /**
     * 아티스트 프로필, 멤버 프로필
     */
    public String upload(MultipartFile multipartFile, String dirName, String name) throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile, dirName, name);
    }

    private String upload(File uploadFile, String dirName, String name){
        String fileName = dirName + "/" + name + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    /**
     * 팬의 인생네컷
     */
    public String uploadLife4Cut(MultipartFile multipartFile, String dirName, String name, String memberFansignId) throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return uploadLife4Cut(uploadFile, dirName, name, memberFansignId);
    }

    private String uploadLife4Cut(File uploadFile, String dirName, String name, String memberFansignId){
        String fileName = dirName + "/" + name + "/life4cut/" + memberFansignId + "/" + "life4cut.jpg";
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }


    /**
     * 팬싸인회 포스터
     */
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

    /**
     * 팬 프로필 이미지
     */
    public String uploadProfile(MultipartFile multipartFile, String dirName, String name)throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return uploadProfile(uploadFile, dirName, name);
    }

    private String uploadProfile(File uploadFile, String dirName, String name){
        String fileName = dirName + "/" + name + "/profile/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }

    /**
     * 팬 검증용 이미지
     */
    public String uploadCertImage(MultipartFile multipartFile, String dirName, String name)throws IOException{
        File uploadFile = convert(multipartFile).orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return uploadCertImage(uploadFile, dirName, name);
    }

    private String uploadCertImage(File uploadFile, String dirName, String name){
        String fileName = dirName + "/" + name + "/certificate/" + "certImage.jpg";
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile); // MultipartFile -> File 로 전환하며 로컬에 생성된 file 삭제

        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
    }



    /**
     * 밑의 메소드들은 5가지의 이미지에서 공통적으로 사용.
     */
    private String putS3(File uploadFile, String fileName){
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        .withCannedAcl(CannedAccessControlList.PublicRead) // PublicRead 권한으로 업로드 됨
        );
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    private void removeNewFile(File targetFile){
        if (targetFile.delete()){
            log.info("스프링 서버 이미지 파일이 삭제되었습니다.(s3엔 정상적으로 올라감)");
        }else {
            log.info("스프링 서버 이미지 파일이 삭제되지 못했습니다.");
        }
    }

    private Optional<File> convert(MultipartFile file){
        File convertFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try {
            if(convertFile.createNewFile()){
                try (FileOutputStream fos = new FileOutputStream(convertFile)){
                    fos.write(file.getBytes());
                }
                return Optional.of(convertFile);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return Optional.empty();
    }

    private Fan getFan(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        FanPrincipalDetails fanPrincipalDetails = (FanPrincipalDetails) authentication.getPrincipal();
        return fanPrincipalDetails.getFan();
    }

}
