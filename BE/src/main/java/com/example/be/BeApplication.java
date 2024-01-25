package com.example.be;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.persistence.EntityManager;

@EnableScheduling // scheduling annotation
@EnableJpaAuditing // createdAt, modifiedAt 을 위한 audit annotation
@SpringBootApplication(
        exclude = {
                org.springframework.cloud.aws.autoconfigure.context.ContextInstanceDataAutoConfiguration.class,
                org.springframework.cloud.aws.autoconfigure.context.ContextStackAutoConfiguration.class,
                org.springframework.cloud.aws.autoconfigure.context.ContextRegionProviderAutoConfiguration.class
        }
)
public class BeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }

    @Bean
    JPAQueryFactory jpaQueryFactory(EntityManager em){
        return new JPAQueryFactory(em);
    }
}
