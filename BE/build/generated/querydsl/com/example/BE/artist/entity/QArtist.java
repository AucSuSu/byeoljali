package com.example.BE.artist.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArtist is a Querydsl query type for Artist
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArtist extends EntityPathBase<Artist> {

    private static final long serialVersionUID = 2059177285L;

    public static final QArtist artist = new QArtist("artist");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final NumberPath<Long> artistId = createNumber("artistId", Long.class);

    public final StringPath artistImageUrl = createString("artistImageUrl");

    public final StringPath companyName = createString("companyName");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final StringPath email = createString("email");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final ListPath<com.example.BE.member.Member, com.example.BE.member.QMember> memberList = this.<com.example.BE.member.Member, com.example.BE.member.QMember>createList("memberList", com.example.BE.member.Member.class, com.example.BE.member.QMember.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public QArtist(String variable) {
        super(Artist.class, forVariable(variable));
    }

    public QArtist(Path<? extends Artist> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArtist(PathMetadata metadata) {
        super(Artist.class, metadata);
    }

}

