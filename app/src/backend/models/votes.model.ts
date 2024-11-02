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
  import { Deputes } from './deputes.model';
  // import { Scrutins } from './scrutins.model';
  
  @Table({
    tableName: 'votes',
    timestamps: true,
  })
  export class Votes extends Model<Votes> {
    @PrimaryKey 
    @AutoIncrement 
    @Column(DataType.INTEGER)
    id!: number;
  
    @ForeignKey(() => Deputes)
    @Column(DataType.INTEGER)
    depute_id!: number;
  
    // @ForeignKey(() => Scrutins)
    // @Column(DataType.INTEGER)
    // scrutin_id!: number;
  
    @Column(DataType.STRING)
    vote_state!: string;
  
    @BelongsTo(() => Deputes)
    depute!: Deputes;
  
    // @BelongsTo(() => Scrutins)
    // scrutin!: Scrutins;
  }
  