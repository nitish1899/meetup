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
export class Discussion extends BaseEntity {
    @Property({ columnType: 'text', nullable: true })
    text: string | null;

    @Property({ columnType: 'text', nullable: true })
    image: string | null;

    @ManyToOne({ entity: () => User })
    user: User;

    @Property({ default: [] })
    hashTags: string[];

    @Property()
    viewCount = 0;

    constructor({
        text,
        user,
        image,
        hashTags,
    }: {
        text: string | null,
        image: string | null,
        user: User,
        hashTags: string[],
    }
    ) {
        super();
        this.text = text;
        this.user = user;
        this.image = image;
        this.hashTags = hashTags;
    }
}
