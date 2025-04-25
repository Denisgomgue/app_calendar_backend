import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Evento } from '../../eventos/entities/evento.entity';

@Entity()
export class Sala {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number_participants: number;

  @Column()
  color: string;

  @Column()
  f_creacion: Date;

  @ManyToOne(() => User, user => user.salas, { eager: true, nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: User;

  @OneToMany(() => Evento, evento => evento.salaId)
  eventos: Evento[];
}