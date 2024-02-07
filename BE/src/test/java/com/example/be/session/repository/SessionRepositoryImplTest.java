package com.example.be.session.repository;

import com.example.be.scheduling.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional(readOnly = true)
class SessionRepositoryImplTest {

    @Autowired
    SessionRepository sessionRepository;

}