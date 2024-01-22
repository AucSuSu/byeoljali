package com.example.BE.photo;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPhoto is a Querydsl query type for Photo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPhoto extends EntityPathBase<Photo> {

    private static final long serialVersionUID = 206023228L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPhoto photo = new QPhoto("photo");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final com.example.BE.artistfansign.entity.QArtistFansign artistFansign;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.example.BE.fan.entity.QFan fan;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final com.example.BE.memberfansign.entity.QMemberFansign memberfansign;

    public final BooleanPath pay = createBoolean("pay");

    public final NumberPath<Long> photoId = createNumber("photoId", Long.class);

    public final StringPath photoUrl = createString("photoUrl");

    public QPhoto(String variable) {
        this(Photo.class, forVariable(variable), INITS);
    }

    public QPhoto(Path<? extends Photo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPhoto(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPhoto(PathMetadata metadata, PathInits inits) {
        this(Photo.class, metadata, inits);
    }

    public QPhoto(Class<? extends Photo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.artistFansign = inits.isInitialized("artistFansign") ? new com.example.BE.artistfansign.entity.QArtistFansign(forProperty("artistFansign")) : null;
        this.fan = inits.isInitialized("fan") ? new com.example.BE.fan.entity.QFan(forProperty("fan")) : null;
        this.memberfansign = inits.isInitialized("memberfansign") ? new com.example.BE.memberfansign.entity.QMemberFansign(forProperty("memberfansign"), inits.get("memberfansign")) : null;
    }

}

