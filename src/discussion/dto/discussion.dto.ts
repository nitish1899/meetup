import { IsOptional, IsArray, IsString, IsNumber } from "class-validator";

export class CreateDiscussionDto {
    @IsOptional()
    @IsString()
    text!: string;

    @IsOptional()
    @IsString()
    image!: string;

    @IsArray()
    hashTags!: string[];
}

export class UpdateDiscussionDto extends CreateDiscussionDto {
    @IsNumber()
    discussionId!: number;
}