import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async handleGoogleAuth() {}

  @Redirect()
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  handleGoogleAuthRedirect(
    @Req() req: Request,
    @Query('state') redirectUrl?: string,
  ) {
    return this.authService.handleGoogleSignin(req, redirectUrl);
  }
}
