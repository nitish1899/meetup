import { Controller } from "@nestjs/common";
import { DiscussionService } from "./discussion.service";

@Controller()
export class DiscussionController {
    constructor(
        private readonly discussionService: DiscussionService,
    ) {

    }
}