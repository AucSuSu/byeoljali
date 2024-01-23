package com.example.be.photo.controller;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import com.example.be.photo.service.PhotoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class PhotoController {

    private final PhotoService photoService;

    // 인생네컷 삭제하기
    @DeleteMapping("/myalbum/{photoId}")
    public ResponseEntity<Message> deletePhoto(@PathVariable("photoId") Long photoId){
        Long id = photoService.deletePhoto(photoId);
        Message message = new Message(HttpStatusEnum.OK, "인생네컷 사진 삭제 성공", id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }
}
