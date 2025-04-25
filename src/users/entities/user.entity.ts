import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity';
import { Evento } from '../../eventos/entities/evento.entity';
import * as bcrypt from 'bcrypt';

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

  @Column( { unique: true })
  dni: string;

  @Column()
  status: string;

  @Column( { unique: true })
  email: string;

  @OneToMany(() => Sala, sala => sala.id_usuario)
  salas: Sala[];

  @OneToMany(() => Evento, evento => evento.creatorId)
  eventos: Evento[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}