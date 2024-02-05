package com.example.be.exception;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice // 전체 컨트롤러에 적용시키기
@Slf4j
public class GlobalControllerExceptionHandler {


    // 이미지 용량 처리 핸들러
    @ExceptionHandler(value = MaxUploadSizeExceededException.class)
    public ResponseEntity<Message> MaxSizeUploadHandler(Exception e){
        log.info(" *** 이미지 크기 초과 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.BAD_REQUEST, "이미지가 너무 큽니다.",null);
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN); // ForBidden으로 해야하나? 따호 한테 물어보기
    }
}
