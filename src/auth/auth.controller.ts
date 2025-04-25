import { Controller, Post, Body, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
// import { SerializeInterceptor } from '../common/interceptors/serialize.interceptor';
// import { UserResponseDto } from '../users/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user);
  }

//   @UseInterceptors(new SerializeInterceptor(UserResponseDto))
//   @Post('register')
//   async register(@Body() registerDto: RegisterDto) {
//     return this.authService.register(registerDto);
//   }
}