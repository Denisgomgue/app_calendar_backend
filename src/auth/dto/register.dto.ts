import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(8) // Ajusta la longitud mínima según tus necesidades
  dni: string;

  @IsString()
  @IsOptional()
  status?: string;
}