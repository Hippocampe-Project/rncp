import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Deputes } from "./deputes.model";

@Table({
  tableName: "partis",
  timestamps: false,
})
export class Partis extends Model<Partis> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  nom: string;

  //Table level decorator. Indicates that this column references the primary key of the foreign table, here under the name 'president_id'.
  @ForeignKey(() => Deputes)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  presidentId: number;

  //Model level decorator. Establishes a one-to-one relationship with Deputes model,and specifies where it is located in the present table ('president_id'). Allows sequelize to automatize data fetching.
  @BelongsTo(() => Deputes, "presidentId")
  president: Deputes;

  //Model level decorator. Establishes a one-to-many relationship with the Deputes table,
  //without it being a column here.
  @HasMany(() => Deputes)
  deputes: Deputes[];
}
