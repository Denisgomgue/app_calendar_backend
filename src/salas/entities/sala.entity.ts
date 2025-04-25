import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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


  @ManyToOne(() => User, user => user.salas, { eager: true, nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: User;

  @OneToMany(() => Evento, evento => evento.salaId)
  eventos: Evento[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}