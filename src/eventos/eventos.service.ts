import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  async create(createEventoDto: CreateEventoDto, file?: Express.Multer.File) {
    console.log('Datos recibidos en createEventoDto:', createEventoDto);
    console.log('Archivo recibido:', file);

    // Validación: al menos NumberDocument o file deben estar presentes
    if (!createEventoDto.NumberDocument && !file) {
      throw new BadRequestException('Debes proporcionar un Número de Documento o un archivo.');
    }

    try {
      const sala = await this.salaRepository.findOne({ where: { id: createEventoDto.salaId } });
      console.log('Sala encontrada:', sala);
      if (!sala) throw new NotFoundException('Sala not found');

      const user = await this.userRepository.findOne({ where: { id: createEventoDto.creatorId } });
      console.log('Usuario encontrado:', user);
      if (!user) throw new NotFoundException('User not found');

      const evento = this.eventoRepository.create({
        ...createEventoDto,
        salaId: sala,
        creatorId: user,
        fileDocument: file?.filename,
      });

      console.log('Evento creado antes de guardar:', evento);
      const savedEvento = await this.eventoRepository.save(evento);
      console.log('Evento guardado en la base de datos:', savedEvento);
      return savedEvento;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw error;
    }
  }

  findAll() {
    return this.eventoRepository.find({ relations: ['salaId', 'creatorId'] });
  }

  async findOne(id: number) {
    const evento = await this.eventoRepository.findOne({ where: { id }, relations: ['salaId', 'creatorId'] });
    if (!evento) throw new NotFoundException('Evento not found');
    return evento;
  }

  async update(id: number, updateEventoDto: UpdateEventoDto, file?: Express.Multer.File) {
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
    if (file) {
      evento.fileDocument = file.filename;
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