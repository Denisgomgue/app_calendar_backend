import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SalasModule } from './salas/salas.module';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // ← Aquí
      password: '',  // ← Aquí
      database: 'app_calendario',      // ← Aquí
      entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
      synchronize: false,
    }),
    SalasModule,
    EventosModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }