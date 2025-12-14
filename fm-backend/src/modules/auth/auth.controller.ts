import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../../common/guards/jwt-refresh.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  async refreshTokens(@CurrentUser() user: any, @Req() req: any) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    return this.authService.refreshTokens(user.userId, refreshToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: any, @Req() req: any) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    return this.authService.logout(user.id, refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: any) {
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
    };
  }
}
