import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDiscussionDto, UpdateDiscussionDto } from "./dto/discussion.dto";
import { Discussion } from "./entities/discussion.entity";
import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/postgresql";
import { User } from "src/user/entities/user.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { SuccessRO } from "src/common/success.ro";
import { DiscussionRO } from "./discussion.ro";


@Injectable()
export class DiscussionService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,

        @InjectRepository(Discussion)
        private readonly discussionRepository: EntityRepository<Discussion>,

        private readonly em: EntityManager,
    ) { }

    async createDiscussion(userId: number, dto: CreateDiscussionDto) {
        const user = await this.userRepository.findOneOrFail({ id: userId });

        if (!dto.image && !dto.text) {
            throw new NotFoundException('Discussion content not found');
        }

        const discussion = new Discussion({ user, text: dto.text, image: dto.image, hashTags: dto.hashTags });

        await this.em.persistAndFlush(discussion);

        return new SuccessRO('Discussion created successfully');

    }

    async updateDiscussion(userId: number, dto: UpdateDiscussionDto) {
        const discussion = await
            this.discussionRepository.findOneOrFail({ id: dto.discussionId, user: userId });

        wrap(discussion).assign({ text: dto.text, image: dto.image, hashTags: dto.hashTags });

        await this.em.flush();

        return new SuccessRO('Discussion updated successfully');
    }

    async deleteDiscussion(userId: number, discussionId: number) {
        const discussion = await
            this.discussionRepository.findOneOrFail({ id: discussionId, user: userId });

        await this.em.removeAndFlush(discussion);

        return new SuccessRO('Discussion deleted successfully');
    }

    async getDiscussionList(pageNumber: number, pageSize: number, hashTags?: string[], text?: string) {
        const offset = (pageNumber - 1) * pageSize;

        const options: FilterQuery<Discussion> = {};

        if (hashTags?.length) {
            options.hashTags = { $contains: hashTags }
        }

        if (text?.length) {
            options.text = { $ilike: `%${text}%` }
        }

        const [discussions, totalCount] = await this.discussionRepository.findAndCount(options, { offset, limit: pageSize });

        return {
            result: discussions.map(d => new DiscussionRO(d)),
            totalCount,
            pageNumber,
            pageSize,
            totalPages: Math.ceil(totalCount / pageSize),
        }

    }
}