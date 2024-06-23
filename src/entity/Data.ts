import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DataType } from './DataType';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => DataType, dataType => dataType.data)
  dataType: DataType;
}