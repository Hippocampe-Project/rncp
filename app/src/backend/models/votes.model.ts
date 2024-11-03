import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from "sequelize-typescript";
import { Deputes } from "./deputes.model";
import { Scrutins } from "./scrutins.model";
import { InferAttributes, InferCreationAttributes } from "sequelize";

@Table({
  tableName: "votes",
  timestamps: true,
})
export class Votes extends Model<
  InferAttributes<Votes>,
  InferCreationAttributes<Votes>
> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'depute_id'.
  @ForeignKey(() => Deputes)
  @Column(DataType.INTEGER)
  depute_id!: number;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'scrutin_id'.
  @ForeignKey(() => Scrutins)
  @Column(DataType.INTEGER)
  scrutin_id!: number;

  @Column(DataType.STRING)
  vote_state!: string;

  //Model level decorator. Establishes a one-to-one relationship with Deputes model. Allows sequelize to automatize data fetching.
  @BelongsTo(() => Deputes)
  depute!: Deputes;

  //Model level decorator. Establishes a one-to-one relationship with Scrutins model. Allows sequelize to automatize data fetching.
  @BelongsTo(() => Scrutins)
  scrutin!: Scrutins;
}
