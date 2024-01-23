package com.example.BE.memberfansign.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberFansign is a Querydsl query type for MemberFansign
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberFansign extends EntityPathBase<MemberFansign> {

    private static final long serialVersionUID = -973251011L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberFansign memberFansign = new QMemberFansign("memberFansign");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final ListPath<com.example.BE.applicant.Applicant, com.example.BE.applicant.QApplicant> applicantList = this.<com.example.BE.applicant.Applicant, com.example.BE.applicant.QApplicant>createList("applicantList", com.example.BE.applicant.Applicant.class, com.example.BE.applicant.QApplicant.class, PathInits.DIRECT2);

    public final com.example.BE.artistfansign.entity.QArtistFansign artistFansign;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final com.example.BE.member.QMember member;

    public final NumberPath<Long> memberfansignId = createNumber("memberfansignId", Long.class);

    public final ListPath<com.example.BE.photo.Photo, com.example.BE.photo.QPhoto> photoList = this.<com.example.BE.photo.Photo, com.example.BE.photo.QPhoto>createList("photoList", com.example.BE.photo.Photo.class, com.example.BE.photo.QPhoto.class, PathInits.DIRECT2);

    public final ListPath<com.example.BE.winning.entity.Winning, com.example.BE.winning.entity.QWinning> winningList = this.<com.example.BE.winning.entity.Winning, com.example.BE.winning.entity.QWinning>createList("winningList", com.example.BE.winning.entity.Winning.class, com.example.BE.winning.entity.QWinning.class, PathInits.DIRECT2);

    public QMemberFansign(String variable) {
        this(MemberFansign.class, forVariable(variable), INITS);
    }

    public QMemberFansign(Path<? extends MemberFansign> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberFansign(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberFansign(PathMetadata metadata, PathInits inits) {
        this(MemberFansign.class, metadata, inits);
    }

    public QMemberFansign(Class<? extends MemberFansign> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.artistFansign = inits.isInitialized("artistFansign") ? new com.example.BE.artistfansign.entity.QArtistFansign(forProperty("artistFansign")) : null;
        this.member = inits.isInitialized("member") ? new com.example.BE.member.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

