import {
  Body,
  Controller,
  Post,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { AuthenticatedRequest } from './types/AuthenticatedRequest.type';
import { Request } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body) {
    console.log(body);
    return this.authService.register(body);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  // @UseGuards(AuthGuard)
  // @Post('session/validate')
  // async validateSession(@Req() request: Request) {
  //   // console.log(request.headers.authorization);
  //   return {};
  // }

  // @Post('session/validate')
  // async validateSession(@Req() request: Request) {
  //   console.log(request.headers.authorization);
  //   return this.authService.validateAuth(request.headers.authorization);
  // }
}
