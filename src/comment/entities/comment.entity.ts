import {
    Property,
    Entity,
    ManyToOne,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Comment extends BaseEntity {
    @Property()
    message: string;

    @ManyToOne({ entity: () => User })
    user: User;

    @ManyToOne({ entity: () => Comment, nullable: true })
    refComment: Comment;

    constructor({ message, user, refComment }: { message: string, user: User, refComment: Comment | null }) {
        super();
        this.message = message;
        this.user = user;
        this.refComment = refComment;
    }
}