import { IsString, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  title: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  @IsString()
  @IsOptional() // Hacemos NumberDocument opcional
  NumberDocument: string;

  @IsString()
  description: string;

//   @IsString()
//   status: string;

  @IsString()
  dni: string;

//   @IsInt()
  salaId: number;

//   @IsInt()
  creatorId: number;
}