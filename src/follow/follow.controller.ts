import { Controller, Post, Body } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { Auth, User } from 'src/common/decorators/user.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessRO } from 'src/common/success.ro';
@ApiTags('Follow')
@Controller('follow')
export class FollowController {
  constructor(
    private readonly followService: FollowService,
  ) { }

  @Auth()
  @ApiResponse({ type: SuccessRO })
  @Post()
  create(@User() followerId: number, @Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(followerId, createFollowDto);
  }

}
