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
  import { Depute } from './depute.model';
  import { Scrutin } from './scrutin.model';
  
  @Table({
    tableName: 'votes',
    timestamps: true,
  })
  export class Vote extends Model<Vote> {
    @PrimaryKey 
    @AutoIncrement 
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Depute)
    @Column(DataType.INTEGER)
    depute_id!: number;
  
    @ForeignKey(() => Scrutin)
    @Column(DataType.INTEGER)
    scrutin_id!: number;
  
    @Column(DataType.STRING)
    vote_state!: string;
  
    @BelongsTo(() => Depute)
    depute!: Depute;
  
    @BelongsTo(() => Scrutin)
    scrutin!: Scrutin;
  }
  