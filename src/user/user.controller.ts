import { Controller, Get, Body, Post, Delete, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRO } from './user.ro';
import { Auth } from '../common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthRO } from 'src/auth/auth.ro';
import { User } from 'src/common/decorators/user.decorator';
import { SuccessRO } from 'src/common/success.ro';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ type: SuccessRO })
  @Auth()
  @Post()
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @ApiOkResponse({ type: UserRO })
  @Auth()
  @Get()
  getUser(@User() userId: number) {
    return this.userService.getUser(userId);
  }

  @ApiOkResponse({ type: SuccessRO })
  @Auth()
  @Delete('/:userId')
  removeUser(@Param('userId') userId: number) {
    return this.userService.removeUser(userId);
  }

  @Auth()
  @Get('list')
  getUserlist(@Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number,
    @Query('searchText') searchText?: string) {
    return this.userService.getUserList(pageNumber, pageSize, searchText);
  }
}
