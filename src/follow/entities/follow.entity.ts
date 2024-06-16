import {
  Entity,
  ManyToOne,
  Index,
} from '@mikro-orm/core';
import { BaseEntity } from '../../base.entity';
import { User } from '../../user/entities/user.entity';

@Index({ name: 'follow_follower_followee_index', properties: ['follower', 'followee'] })
@Entity()
export class Follow extends BaseEntity {

  @Index()
  @ManyToOne(() => User)
  follower: User;

  @Index()
  @ManyToOne(() => User)
  followee: User;

  constructor({ follower, followee }: { follower: User; followee: User }) {
    super();
    this.follower = follower;
    this.followee = followee;
  }
}
