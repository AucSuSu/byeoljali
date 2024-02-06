package com.example.be.exception;

import com.auth0.jwt.exceptions.TokenExpiredException;
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
    public ResponseEntity<Message> maxSizeUploadHandler(Exception e){
        log.info(" *** 이미지 크기 초과 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.PAYLOAD_TOO_LARGE, "이미지가 너무 큽니다.",null);
        return new ResponseEntity<>(message, HttpStatus.PAYLOAD_TOO_LARGE);
    }

    // 이미지
    @ExceptionHandler(value = TokenExpiredException.class)
    public ResponseEntity<Message> tokenExpiredHandler(Exception e){
        log.info(" *** JWT 토큰 만료 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.TOKEN_EXPIRED, "토큰이 만료되었습니다.",null);
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    // refreshToken 불일치 핸들러
    @ExceptionHandler(value = RefreshTokenIncorrectException.class)
    public ResponseEntity<Message> refreshTokenIncorrectHandler(Exception e){
        log.info(" *** refreshToken 불일치 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.TOKEN_INVALIDATE, "refreshToken이 일치하지 않습니다.",null);
        // 재로그인 해달라는 요청임 -> 프론트에서 받아줘요
        return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }

    // session 닫혔을때 메세지 전송시 발생 에러 잡는 핸들러
    @ExceptionHandler(value = SessionClosedException.class)
    public ResponseEntity<Message> sessionClosedStateHandler(Exception e){
        log.info(" *** session 닫힘 불일치 핸들러 *** ");
        Message message = new Message(HttpStatusEnum.SESSION_CLOSED_ERROR, "session이 닫혔습니다.",null);
        return new ResponseEntity<>(message, HttpStatus.CONFLICT);
    }


}
