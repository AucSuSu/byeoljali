package com.example.be.photo.controller;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.photo.dto.PhotoDBDto;
import com.example.be.photo.dto.PhotoResponseDto;
import com.example.be.photo.entity.Photo;
import com.example.be.photo.service.PhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PhotoController {

    private final PhotoService photoService;

    // 인생네컷 DB에 저장하기
    @PostMapping("/myalbum")
    public ResponseEntity<Message> savePhotoDB(@RequestBody PhotoDBDto photoDBDto){
        log.info(" ** 인생네컷 DB 저장 api 입니다 ** ");
        Long id = photoService.downloadDBPhoto(photoDBDto);
        Message message = new Message(HttpStatusEnum.OK, "인생네컷 사진 DB저장 성공", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 인생네컷 삭제하기
    @DeleteMapping("/myalbum/{photoId}")
    public ResponseEntity<Message> deletePhoto(@PathVariable("photoId") Long photoId){
        log.info(" ** 인생네컷 삭제 api 입니다 ** ");
        Long id = photoService.deletePhoto(photoId);
        Message message = new Message(HttpStatusEnum.OK, "인생네컷 사진 삭제 성공", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 인생네컷 조회하기
//    @GetMapping("/myalbum/{fanId}/{keyword}")
//    public ResponseEntity<Message> showPhoto(@PathVariable("fanId") Long fanId, @PathVariable("keyword") String keyword){
//        log.info(" ** 인생네컷 페이지 조회 api 입니다 ** ");
//        List<PhotoResponseDto> dto = photoService.showPhoto(fanId, keyword);
//        Message message = new Message(HttpStatusEnum.OK, "인생네컷 " + keyword +"에 따른 사진 조회 성공", dto);
//        return new ResponseEntity<>(message, HttpStatus.OK);
//    }
    @GetMapping("/myalbum/{fanId}")
    public ResponseEntity<Message> showPhoto(@PathVariable("fanId") Long fanId){
        log.info(" ** 인생네컷 페이지 조회 api 입니다 ** ");
        List<PhotoResponseDto> dto = photoService.showPhoto(fanId);
        Message message = new Message(HttpStatusEnum.OK, "전체 인생네컷 사진 조회 성공", dto);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}