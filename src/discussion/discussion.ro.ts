import { Discussion } from "./entities/discussion.entity";

export class DiscussionRO {
    text: string | null;
    image: string | null;
    user: number;
    hashTags: string[];

    constructor(discussion: Discussion) {
        this.text = discussion.text;
        this.image = discussion.image;
        this.user = discussion.user.id;
        this.hashTags = discussion.hashTags;
    }
}