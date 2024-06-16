import {
    Property,
    Entity,
    ManyToOne,
    Enum,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { User } from '../../user/entities/user.entity';
import { ReactionParentTypeEnum } from '../../common/types/reactionParentTypeEnum';

@Entity()
export class Comment extends BaseEntity {
    @ManyToOne(() => User)
    owner: User;

    @Property()
    message: string;

    @Property({ default: 0 })
    likeCount = 0;

    @Enum(() => ReactionParentTypeEnum)
    parentType: ReactionParentTypeEnum;

    @Property()
    parentId: number;

    constructor({
        owner,
        message,
        parentType,
        parentId
    }: {
        owner: User;
        message: string;
        parentType: ReactionParentTypeEnum;
        parentId: number;
    }) {
        super();
        this.owner = owner;
        this.message = message;
        this.parentType = parentType;
        this.parentId = parentId;
    }
}