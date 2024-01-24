package com.example.be.session.repository;

import com.example.be.memberfansign.entity.MemberFansign;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import static com.example.be.artistfansign.entity.QArtistFansign.artistFansign;
import static com.example.be.memberfansign.entity.QMemberFansign.memberFansign;

@RequiredArgsConstructor

public class SessionRepositoryImpl implements CustomSessionRepository {

    // now와 팬싸인회 시작 시간이 같은 멤버팬싸인회의 아이디를 모두 가져오는 것이 필요함
    // 일단 맴버팬싸인회 전체 가져오기 -> 어차피 service에서 id만 빼서 거르고 controller까지 안감
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<MemberFansign> getMemberFansignList(LocalDateTime now) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = now.format(formatter);

        return jpaQueryFactory.select(memberFansign)
                .from(memberFansign)
                .join(memberFansign.artistFansign, artistFansign)
                .where(Expressions.
                        dateTemplate(String.class, "DATE_FORMAT({0}, {1})", artistFansign.startFansignTime,
                                "%Y-%m-%d").eq(formattedDate)).fetch();
    }
}
