import {
    Property,
    Entity,
    ManyToOne,
    Check,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@Check({ name: 'postAndCommentNotNullCheck', expression: '(post IS NOT NULL OR comment IS NOT NULL) AND NOT (post IS NULL AND comment IS NULL)' })
@Entity()
export class Like extends BaseEntity {

    @ManyToOne({ entity: () => User })
    user: User;

    @ManyToOne({ entity: () => Comment, nullable: true })
    comment: Comment;

    @ManyToOne({ entity: () => Comment, nullable: true })
    post: Post;

    constructor({ comment, user, post }:
        { comment: Comment, user: User, post: Post }) {
        super();
        this.comment = comment;
        this.user = user;
        this.post = post;
    }
}