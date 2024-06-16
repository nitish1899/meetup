import { Module } from "@nestjs/common";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { EntityRepository } from "@mikro-orm/postgresql";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/user/entities/user.entity";

@Module({
    providers: [DiscussionService, EntityRepository],
    controllers: [DiscussionController],
    imports: [MikroOrmModule.forFeature({
        entities: [User],
    }),]

})
export class DiscussionModule { }