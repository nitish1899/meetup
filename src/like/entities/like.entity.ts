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
export class Like extends BaseEntity {
    @ManyToOne(() => User)
    user: User;

    @Enum(() => ReactionParentTypeEnum)
    parentType: ReactionParentTypeEnum;

    @Property()
    parentId: number;

    constructor({
        user,
        parentType,
        parentId,
    }: {
        user: User;
        parentType: ReactionParentTypeEnum;
        parentId: number;
    }) {
        super();
        this.user = user;
        this.parentType = parentType;
        this.parentId = parentId;
    }
}
