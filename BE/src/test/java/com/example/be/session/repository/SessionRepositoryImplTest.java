//package com.example.be.session.repository;
//
//import com.example.be.config.redis.RedisService;
//import com.example.be.memberfansign.entity.MemberFansign;
//import com.querydsl.jpa.impl.JPAQueryFactory;
//import org.assertj.core.api.Assertions;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional(readOnly = true)
//class SessionRepositoryImplTest {
//
//    @Autowired
//    SessionRepository sessionRepository;
//    @Autowired
//    RedisService redisService;
//
//    @Test
//    public void 팬싸인회_세션발급_test(){
//
//        LocalDateTime now = LocalDateTime.now();
//        List<MemberFansign> list =
//        sessionRepository.getMemberFansignList(now);
//
//        for(MemberFansign e : list){
//            System.out.println("sessionId 발급해야할 entity -> " + e.getMemberfansignId());
//        }
//    }
//
//    @Test
//    public void redis에서_세션가져오기_test(){
//        redisService.setValues("1", "key");
//        System.out.println("redis get 1 -> " +   redisService.getValues("1"));
//    }
//
//}