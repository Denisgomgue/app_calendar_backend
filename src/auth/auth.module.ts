import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_jwt_secret', // Reemplaza con una clave secreta más segura
      signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
    }),
  ],
  controllers: [ AuthController ],
  providers: [ AuthService, LocalStrategy, JwtStrategy ],
})
export class AuthModule { }