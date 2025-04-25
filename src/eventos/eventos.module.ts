import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { Evento } from './entities/evento.entity';
import { Sala } from '../salas/entities/sala.entity';
import { User } from '../users/entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Evento, Sala, User]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardarán los archivos
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
        const ext = extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type. Only PDF, JPG, JPEG, PNG, DOC, and DOCX are allowed.'), false);
        }
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // Límite de 5MB por archivo
      },
    }),
  ],
  controllers: [EventosController],
  providers: [EventosService],
})
export class EventosModule {}