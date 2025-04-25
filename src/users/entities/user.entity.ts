import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @Column()
  email: string;

  @OneToMany(() => Sala, sala => sala.id_usuario)
  salas: Sala[];

  @OneToMany(() => Evento, evento => evento.creatorId)
  eventos: Evento[];
}