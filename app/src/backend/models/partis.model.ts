import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany,
  } from 'sequelize-typescript';
  import { Deputes } from './deputes.model';
  
  @Table({
    tableName: 'partis',
    timestamps: false,
  })
  export class Partis extends Model<Partis> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @Column(DataType.STRING)
    nom: string;
  
    @HasMany(() => Deputes)
    deputes: Deputes[];
  }
  