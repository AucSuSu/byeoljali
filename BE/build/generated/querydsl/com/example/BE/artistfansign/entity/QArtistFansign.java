package com.example.BE.artistfansign.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArtistFansign is a Querydsl query type for ArtistFansign
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArtistFansign extends EntityPathBase<ArtistFansign> {

    private static final long serialVersionUID = -707159011L;

    public static final QArtistFansign artistFansign = new QArtistFansign("artistFansign");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final NumberPath<Long> artistfansignId = createNumber("artistfansignId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final DateTimePath<java.time.LocalDateTime> endApplyTime = createDateTime("endApplyTime", java.time.LocalDateTime.class);

    public final StringPath information = createString("information");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final ListPath<com.example.BE.memberfansign.entity.MemberFansign, com.example.BE.memberfansign.entity.QMemberFansign> memberFansignList = this.<com.example.BE.memberfansign.entity.MemberFansign, com.example.BE.memberfansign.entity.QMemberFansign>createList("memberFansignList", com.example.BE.memberfansign.entity.MemberFansign.class, com.example.BE.memberfansign.entity.QMemberFansign.class, PathInits.DIRECT2);

    public final EnumPath<FansignMode> mode = createEnum("mode", FansignMode.class);

    public final StringPath posterImageUrl = createString("posterImageUrl");

    public final DateTimePath<java.time.LocalDateTime> startApplyTime = createDateTime("startApplyTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> startFansignTime = createDateTime("startFansignTime", java.time.LocalDateTime.class);

    public final EnumPath<FansignStatus> status = createEnum("status", FansignStatus.class);

    public final StringPath title = createString("title");

    public QArtistFansign(String variable) {
        super(ArtistFansign.class, forVariable(variable));
    }

    public QArtistFansign(Path<? extends ArtistFansign> path) {
        super(path.getType(), path.getMetadata());
    }

    public QArtistFansign(PathMetadata metadata) {
        super(ArtistFansign.class, metadata);
    }

}

