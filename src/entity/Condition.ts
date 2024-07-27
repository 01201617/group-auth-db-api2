import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Condition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  place: string;

  @Column()
  method: string;
}
