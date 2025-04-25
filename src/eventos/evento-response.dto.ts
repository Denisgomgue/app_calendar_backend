import { Type } from 'class-transformer';
import { UserResponseDto } from '../users/user-response.dto';
import { SalaResponseDto } from '../salas/sala-response.dto';

export class EventoResponseDto {
    id: number;
    title: string;
    startTime: Date;
    endTime: Date;
    NumberDocument: string;
    fileDocument: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    dni: string;

    @Type(() => SalaResponseDto)
    salaId: SalaResponseDto;

    @Type(() => UserResponseDto)
    creatorId: UserResponseDto;
}