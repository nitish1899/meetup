import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SuccessRO } from 'src/common/success.ro';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('User')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOkResponse({ type: SuccessRO })
  @Post('/signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @ApiOkResponse({ type: SuccessRO })
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
