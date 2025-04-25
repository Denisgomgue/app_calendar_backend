import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasModule } from './salas/salas.module';
import { EventosModule } from './eventos/eventos.module';
import { UsersModule } from './users/users.module';
import { Sala } from './salas/entities/sala.entity';
import { Evento } from './eventos/entities/evento.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',      // ← Aquí
      password: '',  // ← Aquí
      database: 'app_calendario',      // ← Aquí
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SalasModule,
    EventosModule,
    UsersModule,
  ],
})
export class AppModule {}