import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql'

@Module({
  controllers: [FollowController],
  providers: [FollowService, EntityRepository],
  imports: [
    MikroOrmModule.forFeature({ entities: [Follow, User] }),
  ],
})
export class FollowModule { }
