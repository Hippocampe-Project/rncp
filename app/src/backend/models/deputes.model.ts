import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
  } from 'sequelize-typescript';
  import { Partis } from './partis.model';
  
  @Table({
    tableName: 'deputes',
    timestamps: false,
  })
  export class Deputes extends Model<Deputes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @Column(DataType.STRING)
    nom: string;
  
    @ForeignKey(() => Partis)
    @Column(DataType.INTEGER)
    parti_id: number;
  
    @BelongsTo(() => Partis)
    parti: Partis;
  }
  