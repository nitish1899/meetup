import {
    Property,
    Entity,
    ManyToOne,
    ManyToMany,
    Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Post extends BaseEntity {
    @Property({ type: 'text', nullable: true })
    text: string | null;

    @Property({ type: 'text', nullable: true })
    image: string | null;

    @ManyToOne({ entity: () => User })
    user: User;

    @Property({ default: [] })
    hashTags: string[];

    @ManyToMany()
    comments = new Collection<Comment>(this);

    @Property({ default: 0 })
    viewCount: number;

    constructor(
        { text, user, image, hashTags, viewCount }:
            { text: string | null, image: string | null, user: User, hashTags: string[], viewCount: number }
    ) {
        super();
        this.text = text;
        this.user = user;
        this.image = image;
        this.hashTags = hashTags;
        this.viewCount = viewCount;
    }
}
