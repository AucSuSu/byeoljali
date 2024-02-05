package com.example.be.session.repository;

import com.example.be.config.redis.RedisService;
import com.example.be.memberfansign.entity.MemberFansign;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional(readOnly = true)
class SessionRepositoryImplTest {

    @Autowired
    SessionRepository sessionRepository;

}