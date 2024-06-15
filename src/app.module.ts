import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './common/JwtMiddleware';
import config from 'mikro-orm.config';
import { omit } from 'lodash';


const testDbUrl = 'postgresql://postgres:testdb@localhost:5460/postgres';

const getMikroORMConfig = async () => {
  const isTest = process.env.NODE_ENV === 'test';
  if (isTest) {
    return {
      ...omit(config, 'driverOptions'),
      clientUrl: testDbUrl,
    };
  }
  return config;
};

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: getMikroORMConfig,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
