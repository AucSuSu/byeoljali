package com.example.BE.fan.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFan is a Querydsl query type for Fan
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFan extends EntityPathBase<Fan> {

    private static final long serialVersionUID = 1354882941L;

    public static final QFan fan = new QFan("fan");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final ListPath<com.example.BE.applicant.entity.Applicant, com.example.BE.applicant.entity.QApplicant> applicantList = this.<com.example.BE.applicant.entity.Applicant, com.example.BE.applicant.entity.QApplicant>createList("applicantList", com.example.BE.applicant.entity.Applicant.class, com.example.BE.applicant.entity.QApplicant.class, PathInits.DIRECT2);

    public final DatePath<java.time.LocalDate> birth = createDate("birth", java.time.LocalDate.class);

    public final StringPath certificationImageUrl = createString("certificationImageUrl");

    public final NumberPath<Integer> changeCount = createNumber("changeCount", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    public final NumberPath<Long> fanId = createNumber("fanId", Long.class);

    public final BooleanPath isBlacklist = createBoolean("isBlacklist");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final ListPath<com.example.BE.photo.Photo, com.example.BE.photo.QPhoto> photoList = this.<com.example.BE.photo.Photo, com.example.BE.photo.QPhoto>createList("photoList", com.example.BE.photo.Photo.class, com.example.BE.photo.QPhoto.class, PathInits.DIRECT2);

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final StringPath roles = createString("roles");

    public final ListPath<com.example.BE.winning.entity.Winning, com.example.BE.winning.entity.QWinning> winningList = this.<com.example.BE.winning.entity.Winning, com.example.BE.winning.entity.QWinning>createList("winningList", com.example.BE.winning.entity.Winning.class, com.example.BE.winning.entity.QWinning.class, PathInits.DIRECT2);

    public QFan(String variable) {
        super(Fan.class, forVariable(variable));
    }

    public QFan(Path<? extends Fan> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFan(PathMetadata metadata) {
        super(Fan.class, metadata);
    }

}

