package com.example.BE.winning.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWinning is a Querydsl query type for Winning
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWinning extends EntityPathBase<Winning> {

    private static final long serialVersionUID = -2127899683L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWinning winning = new QWinning("winning");

    public final com.example.BE.common.QBaseEntity _super = new com.example.BE.common.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdDate = _super.createdDate;

    public final com.example.BE.fan.entity.QFan fan;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedDate = _super.lastModifiedDate;

    public final com.example.BE.memberfansign.entity.QMemberFansign memberfansign;

    public final NumberPath<Integer> orders = createNumber("orders", Integer.class);

    public final NumberPath<Long> winningId = createNumber("winningId", Long.class);

    public QWinning(String variable) {
        this(Winning.class, forVariable(variable), INITS);
    }

    public QWinning(Path<? extends Winning> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWinning(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWinning(PathMetadata metadata, PathInits inits) {
        this(Winning.class, metadata, inits);
    }

    public QWinning(Class<? extends Winning> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.fan = inits.isInitialized("fan") ? new com.example.BE.fan.entity.QFan(forProperty("fan")) : null;
        this.memberfansign = inits.isInitialized("memberfansign") ? new com.example.BE.memberfansign.entity.QMemberFansign(forProperty("memberfansign"), inits.get("memberfansign")) : null;
    }

}

