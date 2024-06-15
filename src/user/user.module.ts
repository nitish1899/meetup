import { AuthModule } from 'src/auth/auth.module';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  controllers: [UserController],
  providers: [UserService, EntityRepository],
  imports: [
    MikroOrmModule.forFeature({
      entities: [User],
    }),
    AuthModule,
  ],
  exports: [UserService],
})
export class UserModule {}
