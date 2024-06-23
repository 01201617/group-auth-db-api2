import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { User } from './User';
import { DataType } from './DataType';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  permission: string;

  @ManyToMany(() => User, user => user.groups)
  users: User[];

  @OneToMany(() => DataType, dataType => dataType.group)
  dataTypes: DataType[];
}