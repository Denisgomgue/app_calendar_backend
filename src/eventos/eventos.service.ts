import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { Evento } from './entities/evento.entity';
import { Sala } from '../salas/entities/sala.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Sala)
    private readonly salaRepository: Repository<Sala>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventoDto: CreateEventoDto) {
    const sala = await this.salaRepository.findOne({ where: { id: createEventoDto.salaId } });
    if (!sala) throw new NotFoundException('Sala not found');

    const user = await this.userRepository.findOne({ where: { id: createEventoDto.creatorId } });
    if (!user) throw new NotFoundException('User not found');

    const evento = this.eventoRepository.create({ ...createEventoDto, salaId: sala, creatorId: user });
    return this.eventoRepository.save(evento);
  }

  findAll() {
    return this.eventoRepository.find({ relations: ['salaId', 'creatorId'] });
  }

  async findOne(id: number) {
    const evento = await this.eventoRepository.findOne({ where: { id }, relations: ['salaId', 'creatorId'] });
    if (!evento) throw new NotFoundException('Evento not found');
    return evento;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto) {
    const evento = await this.findOne(id);
    if (updateEventoDto.salaId) {
      const sala = await this.salaRepository.findOne({ where: { id: updateEventoDto.salaId } });
      if (!sala) throw new NotFoundException('Sala not found');
      evento.salaId = sala;
    }
    if (updateEventoDto.creatorId) {
      const user = await this.userRepository.findOne({ where: { id: updateEventoDto.creatorId } });
      if (!user) throw new NotFoundException('User not found');
      evento.creatorId = user;
    }
    Object.assign(evento, updateEventoDto);
    return this.eventoRepository.save(evento);
  }

  async remove(id: number) {
    const evento = await this.findOne(id);
    await this.eventoRepository.remove(evento);
    return { message: 'Evento deleted' };
  }
}