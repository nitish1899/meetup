import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Follow } from './entities/follow.entity';
import { SuccessRO } from 'src/common/success.ro';
import { User } from 'src/user/entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: EntityRepository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) { }

  async create(userId: number, createFollowDto: CreateFollowDto) {
    if (userId === createFollowDto.followeeId) {
      throw new BadRequestException();
    }

    const [follower, followee] = await Promise.all([
      this.userRepository.findOne(userId),
      this.userRepository.findOne(createFollowDto.followeeId),
    ]);

    if (!follower || !followee) {
      throw new NotFoundException('user not found');
    }

    const isExistFollow = await this.followRepository.find({
      follower: follower,
      followee: followee,
    });

    if (isExistFollow.length !== 0) {
      throw new BadRequestException('already followed');
    }

    const followData = new Follow({
      follower: follower,
      followee: followee,
    });

    await this.em.persistAndFlush(followData);

    return new SuccessRO('This action adds a new follow');
  }
}
