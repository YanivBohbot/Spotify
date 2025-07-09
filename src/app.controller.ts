import { Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGaurd } from './auth/authentication/jwt-guards';
import { request } from 'http';

export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGaurd)
  getProfile(
    @Req()
    request,
  ) {
    return request.user;
  }
}
