import { Type } from 'class-transformer';
import { UserResponseDto } from '../users/user-response.dto';

export class SalaResponseDto {
    id: number;
    name: string;
    number_participants: number;
    color: string;

    @Type(() => UserResponseDto) // Transformamos id_usuario a UserResponseDto
    id_usuario: UserResponseDto;

    createdAt: Date;
    updatedAt: Date;
}