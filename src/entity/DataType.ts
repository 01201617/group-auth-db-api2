import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Group } from './Group';
import { Data } from './Data';

@Entity()
export class DataType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Group, group => group.dataTypes)
  group: Group;

  @OneToMany(() => Data, data => data.dataType)
  data: Data[];
}