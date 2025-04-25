import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('eventos')
@UseGuards(JwtAuthGuard)
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('fileDocument')) // 'fileDocument' debe coincidir con el nombre del campo en el formulario del frontend
  create(@Body() createEventoDto: CreateEventoDto, @UploadedFile() file: Express.Multer.File) {
    return this.eventosService.create(createEventoDto, file);
  }

  @Get()
  findAll() {
    return this.eventosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('fileDocument'))
  update(@Param('id') id: string, @Body() updateEventoDto: UpdateEventoDto, @UploadedFile() file: Express.Multer.File) {
    return this.eventosService.update(+id, updateEventoDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventosService.remove(+id);
  }
}