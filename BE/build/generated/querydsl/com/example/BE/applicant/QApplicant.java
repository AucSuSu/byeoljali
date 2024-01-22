package com.example.BE.applicant;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QApplicant is a Querydsl query type for Applicant
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QApplicant extends EntityPathBase<Applicant> {

    private static final long serialVersionUID = -588304420L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QApplicant applicant = new QApplicant("applicant");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    public final NumberPath<Long> applicantId = createNumber("applicantId", Long.class);

    public final com.example.BE.artistfansign.entity.QArtistFansign artistFansign;

    public final NumberPath<Integer> boughtAlbum = createNumber("boughtAlbum", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.example.BE.fan.entity.QFan fan;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final com.example.BE.memberfansign.entity.QMemberFansign memberfansign;

    public QApplicant(String variable) {
        this(Applicant.class, forVariable(variable), INITS);
    }

    public QApplicant(Path<? extends Applicant> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QApplicant(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QApplicant(PathMetadata metadata, PathInits inits) {
        this(Applicant.class, metadata, inits);
    }

    public QApplicant(Class<? extends Applicant> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.artistFansign = inits.isInitialized("artistFansign") ? new com.example.BE.artistfansign.entity.QArtistFansign(forProperty("artistFansign")) : null;
        this.fan = inits.isInitialized("fan") ? new com.example.BE.fan.entity.QFan(forProperty("fan")) : null;
        this.memberfansign = inits.isInitialized("memberfansign") ? new com.example.BE.memberfansign.entity.QMemberFansign(forProperty("memberfansign"), inits.get("memberfansign")) : null;
    }

}

