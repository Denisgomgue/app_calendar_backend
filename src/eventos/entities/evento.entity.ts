import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Sala } from '../../salas/entities/sala.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  NumberDocument: string;

  @Column({ nullable: true })
  fileDocument: string;

  @Column()
  description: string;

//   @Column()
//   status: string;

  @Column()
  dni: string;

  @ManyToOne(() => Sala, sala => sala.eventos, { eager: true, nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'salaId' })
  salaId: Sala;

  @ManyToOne(() => User, user => user.eventos, { eager: true, nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'creatorId' })
  creatorId: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}