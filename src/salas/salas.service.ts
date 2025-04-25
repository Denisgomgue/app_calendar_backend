import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from './entities/sala.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createSalaDto: CreateSalaDto) {
    const user = await this.userRepository.findOne({ where: { id: createSalaDto.id_usuario } });
    if (!user) throw new NotFoundException('User not found');

    const sala = this.salaRepository.create({ ...createSalaDto, id_usuario: user });
    return this.salaRepository.save(sala);
  }

  findAll() {
    return this.salaRepository.find({ relations: ['id_usuario'] });
  }

  async findOne(id: number) {
    const sala = await this.salaRepository.findOne({ where: { id }, relations: ['id_usuario'] });
    if (!sala) throw new NotFoundException('Sala not found');
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto) {
    const sala = await this.findOne(id);
    if (updateSalaDto.id_usuario) {
      const user = await this.userRepository.findOne({ where: { id: updateSalaDto.id_usuario } });
      if (!user) throw new NotFoundException('User not found');
      sala.id_usuario = user;
    }
    Object.assign(sala, updateSalaDto);
    return this.salaRepository.save(sala);
  }

  async remove(id: number) {
    const sala = await this.findOne(id);
    await this.salaRepository.remove(sala);
    return { message: 'Sala deleted' };
  }
}