package com.example.be.exception;

import com.example.be.common.HttpStatusEnum;
import com.example.be.common.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.net.http.WebSocketHandshakeException;

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

    // refreshToken 불일치 핸들러
    @ExceptionHandler(value = RefreshTokenIncorrectException.class)
    public ResponseEntity<Message> RefreshTokenIncorrectHandler(Exception e){
        log.info(" *** refreshToken 불일치 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.BAD_REQUEST, "refreshToken이 일치하지 않습니다.",null);
        // 재로그인 해달라는 요청임 -> 프론트에서 받아줘요
        return new ResponseEntity<>(message, HttpStatus.FORBIDDEN); // ForBidden으로 해야하나? 따호 한테 물어보기
    }

    // session 닫혔을때 메세지 전송시 발생 에러 잡는 핸들러
    @ExceptionHandler(value = SessionClosedException.class)
    public ResponseEntity<Message> sessionClosedStateHandler(Exception e){
        log.info(" *** session 닫힘 불일치 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.SESSION_CLOSED_ERROR, "session이 닫혔습니다.",null);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }


}
