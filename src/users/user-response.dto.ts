import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  name: string;
  lastname: string;
  status: string;
  email: string;
  dni: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}