import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DataType } from './DataType';
import { Condition } from './Condition';

@Entity()
export class Data {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Condition, condition => condition)
  condition: Condition;

  @ManyToOne(() => DataType, dataType => dataType.data)
  dataType: DataType;
}