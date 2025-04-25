import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { Sala } from './entities/sala.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sala, User])],
  controllers: [SalasController],
  providers: [SalasService],
})
export class SalasModule {}